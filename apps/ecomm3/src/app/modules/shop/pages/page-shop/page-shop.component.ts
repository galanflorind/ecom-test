import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageShopService } from '../../services/page-shop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil, take } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { ShopCategory } from '../../../../interfaces/category';
import { LanguageService } from '../../../language/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductsList } from '../../../../interfaces/list';
import { filterHandlers } from '../../filters/filter-handlers';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { Filter } from '../../../../interfaces/filter';
import { FilterHandler } from '../../filters/filter.handler';
import { ECommerceService } from '../../../../e-commerce.service';
import { AppService } from '../../../../app.service';
import {
    buildCategoriesFilter,
    buildManufacturerFilter,
    buildPriceFilter
} from '../../filters/filter.utils.static';
import { getBreadcrumbs } from '../../../shared/functions/utils';
import { ToastrService } from 'ngx-toastr';


export type PageShopLayout =
    'grid' |
    'grid-with-features' |
    'list' |
    'table';

export type PageShopGridLayout =
    'grid-3-sidebar' |
    'grid-4-sidebar' |
    'grid-4-full' |
    'grid-5-full' |
    'grid-6-full';

export type PageShopSidebarPosition = 'start' | 'end' | false;

export type PageShopOffCanvasSidebar = 'always' | 'mobile';

export interface PageShopData {
    layout: PageShopLayout;
    gridLayout: PageShopGridLayout;
    sidebarPosition: PageShopSidebarPosition;
    category: ShopCategory;
    productsList: ProductsList;
}

@Component({
    selector: 'app-page-shop',
    templateUrl: './page-shop.component.html',
    styleUrls: ['./page-shop.component.scss'],
    providers: [
        ShopSidebarService
    ],
})
export class PageShopComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    private refreshSubs = new Subscription();

    public layout: PageShopLayout = 'grid';
    public gridLayout: PageShopGridLayout = 'grid-4-sidebar';
    public sidebarPosition: PageShopSidebarPosition = 'start';
    public pageTitle$!: string;
    public breadcrumbs: BreadcrumbItem[];

    public get offCanvasSidebar(): PageShopOffCanvasSidebar {
        return ['grid-4-full', 'grid-5-full', 'grid-6-full'].includes(this.gridLayout) ? 'always' : 'mobile';
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private page: PageShopService,
        private location: Location,
        private url: UrlService,
        private language: LanguageService,
        private translate: TranslateService,
        private eCommerceService: ECommerceService,
        private appService: AppService,
        private toastr: ToastrService
    ) { }

    public ngOnInit(): void {
        const data$: Observable<PageShopData> = this.route.data as Observable<PageShopData>;
        // -->Set: title
        this.pageTitle$ = this.translate.instant('HEADER_SHOP');
        // -->Set: breadcrumb
        this.breadcrumbs = [
            {
                label: this.translate.instant('LINK_HOME'),
                url: this.url.home(),
            },
            {
                label: this.translate.instant('LINK_SHOP'),
                url: this.url.shop(),
            },
        ];

        // -->Set: page options from query params on landing
        this.setPageOptions();

        // -->Subscribe: to page shop data updates
        data$.subscribe((data: PageShopData) => {
            this.layout = data.layout;
            this.gridLayout = data.gridLayout;
            this.sidebarPosition = data.sidebarPosition;
        });

        // -->Refresh: page shop on data update, navigation or option changes
        data$.pipe(
            switchMap((data: PageShopData) => merge(
                of(data.productsList),
                this.router.events,
                this.page.optionsChange$
                )
            ),
            debounceTime(100),
            takeUntil(this.destroy$)
        )
        .subscribe((options) => {
            // -->Refresh: products according to options
            this.refresh();
        });
    }

    /**
     * Refresh products
     */
    public refresh(): void {
        if (this.refreshSubs) {
            this.refreshSubs.unsubscribe();
            this.refreshSubs = null;
        }

        // -->Start: loading
        this.page.isLoading = true;
        // -->Get: category id
        const categoryId: number = this.route.snapshot.params.categoryId ? +this.route.snapshot.params.categoryId : undefined;

        // -->Set: page number to 1 if category changed
        if (this.page.options.category !== categoryId) {
            this.page.options.page = 1;
        }

        // -->Update: category on page options
        this.page.options.category = categoryId;

        // -->Create: filters options
        const options = {
            ...this.page.options,
            filters: {
                ...this.page.options.filters,
                category: categoryId,
            },
        } as any;

        // -->Get: Selected manufacturers
        const selectedManufacturerIds = options?.filters?.manufacturer?.split(',')?.filter((f) => f) || [];


        // -->Create: query
        const query = {
            searchTerm: options.searchTerm, // search name, description, itemId, manufacturerId, partId
            categoryId: options.filters?.category,
            manufacturerIds: selectedManufacturerIds,
            sortBy: 'name',
            sortOrder: options.sort === 'name_asc' ? 1 : -1, // 1 = asc/ -1 = desc
            pageSize: options.limit || this.page.defaultOptions.limit,
            pageNo: options.page || this.page.defaultOptions.page,
            calculateFilters: true
        } as any;

        // -->Get: min and max price range
        let minPrice, maxPrice;
        // -->Check: if there is a price already set, if not wait for the response
        if (options?.filters?.price?.split('-')?.length) {
            // -->Split: string to get min and max price
            [minPrice, maxPrice] = options?.filters?.price?.split('-').map(p => +p);
            // -->Set: only if both of them are numbers
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                query.minPrice = minPrice;
                query.maxPrice = maxPrice;
            }
        }

        // -->Execute
        this.refreshSubs = this.eCommerceService.productsFilter(query).subscribe((res) => {
            // -->Check: res
            if (res && res.ok && res.data) {

                // -->Init: filters
                const filters = [];
                // -->Push: category filters
                filters.push(buildCategoriesFilter(this.appService.appInfo?.getValue()?.categories?.items || [], categoryId));
                // --->Push: price filter
                filters.push(buildPriceFilter(res.data?.filterInfo?.min, res.data?.filterInfo?.max, minPrice, maxPrice));
                // -->Push: manufacturers filter
                filters.push(buildManufacturerFilter(res.data?.filterInfo?.vendors || [], selectedManufacturerIds));

                // -->Compute: total pages and current page based on response data count and page size
                const pages = Math.ceil(res.data?.count / query.pageSize);
                const page = options.page > pages ? 1 : options.page;

                // -->Set: List and calculate pages and everything
                const list = {
                    items: res.data.items || [],
                    filters: filters,
                    page: page,
                    limit: query.pageSize,
                    sort: options.sort || this.page.defaultOptions.sort,
                    total: res.data?.count || 0,
                    pages: pages,
                    from: (page - 1) * query.pageSize + 1 <= res.data?.count ? (page - 1) * query.pageSize + 1 : 0,
                    to: (page * query.pageSize) < res.data?.count ? (page * query.pageSize) : res.data?.count,
                };

                // -->Get: breadcrumbs
                const breadcrumbs = getBreadcrumbs(this.appService.appInfo?.getValue()?.categories?.items, categoryId);
                // -->Update: breadcrumbs
                this.breadcrumbs = [
                    {
                        label: this.translate.instant('LINK_HOME'),
                        url: this.url.home()
                    },
                    {
                        label: this.translate.instant('LINK_SHOP'),
                        url: this.url.shop()
                    },
                    ...breadcrumbs.map((x) => ({
                        label: x.name,
                        url: this.url.category(x)
                    })),
                ];
                if (breadcrumbs.length) {
                    this.pageTitle$ = breadcrumbs[breadcrumbs.length - 1].name;
                } else {
                    // -->Set: title
                    this.pageTitle$ = this.translate.instant('HEADER_SHOP');
                }

                // -->Set: data
                this.page.isLoading = false;
                this.page.setList(list);

                // -->Update: url
                this.updateUrl();

            } else {
                this.page.isLoading = false;

                // -->Show: errors
                this.toastr.error(this.translate.instant('ERROR_API_REQUEST'));

                // todo: refresh with default data
            }
        });
    }


    /**
     * Update url
     */
    private updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }

    /**
     * Get query params from page options
     */
    private getQueryParams(): Params {
        const params: Params = {};
        const options = this.page.options;
        const filterValues = options.filters || {};

        // -->Check: page
        if (options.hasOwnProperty('page') && options.page !== this.page.defaultOptions.page) {
            params.page = options.page ? options.page : this.page.defaultOptions.page;
        }
        // -->Check: limit
        if (options.hasOwnProperty('limit') && options.limit !== this.page.defaultOptions.limit) {
            params.limit = options.limit ? options.limit : this.page.defaultOptions.limit;
        }
        // -->Check: sort
        if (options.hasOwnProperty('sort') && options.sort !== this.page.defaultOptions.sort) {
            params.sort = options.sort ? options.sort : this.page.defaultOptions.sort;
        }
        // -->Check: filters
        if (options.hasOwnProperty('filters') && this.page.filters) {
            this.page.filters
                .map(
                    filter => ({
                        filter,
                        handler: filterHandlers.find((x) => x.type === filter.type),
                    })
                )
                .filter(
                    (x): x is { filter: Filter; handler: FilterHandler } => (
                        !!x.handler && !!filterValues[x.filter.slug])
                )
                .forEach(({ filter, handler }) => {
                    const value = handler.deserialize(filterValues[filter.slug]);

                    // -->Add: filter to params
                    if (!handler.isDefaultValue(filter, value)) {
                        params[`filter_${filter.slug}`] = handler.serialize(value);
                    }
                });
        }

        return params;
    }

    /**
     * Set page options from query params
     */
    private setPageOptions() {
        // -->Update page options from query params
        this.route.queryParams.pipe(take(1)).subscribe((param) => {
            // --Check: param
            if (!param)
            {
                return;
            }

            // -->Check: page
            if (param.hasOwnProperty('page') && param['page']) {
                this.page.options.page = param['page'];
            }
            // -->Check: limit
            if (param.hasOwnProperty('limit') && param['limit']) {
                this.page.options.limit = param['limit'];
            }
            // -->Check: sort
            if (param.hasOwnProperty('sort') && param['sort']) {
                this.page.options.sort = param['sort'];
            }
            // -->Check: price filter
            if (param.hasOwnProperty('filter_price') && param['filter_price']) {
                this.page.setFilterValue('price', param['filter_price']);
            }
            // -->Check: manufacturer filter
            if (param.hasOwnProperty('filter_manufacturer') && param['filter_manufacturer']) {
                this.page.setFilterValue('manufacturer', param['filter_manufacturer']);
            }
        });
    }

    /**
     * Destroy
     */
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
