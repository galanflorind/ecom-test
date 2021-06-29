import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageShopService } from '../../services/page-shop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopApi } from '../../../../api';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { getCategoryPath } from '../../../../functions/utils';
import { ShopCategory } from '../../../../interfaces/category';
import { LanguageService } from '../../../language/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductsList } from '../../../../interfaces/list';
import { filterHandlers } from '../../filters/filter-handlers';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { Filter } from '../../../../interfaces/filter';
import { FilterHandler } from '../../filters/filter.handler';
import { ECommerceService } from "../../../../e-commerce.service";
import {AppService} from "../../../../app.service";
import {buildManufacturerFilter, buildPriceFilter} from "../../filters/filter.utils.static";
import {nameToSlug} from "../../../../../fake-server/utils";

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
        ShopSidebarService,
    ],
})
export class PageShopComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public layout: PageShopLayout = 'grid';

    public gridLayout: PageShopGridLayout = 'grid-4-sidebar';

    public sidebarPosition: PageShopSidebarPosition = 'start';

    public pageTitle$!: Observable<string>;

    public breadcrumbs$!: Observable<BreadcrumbItem[]>;

    get offCanvasSidebar(): PageShopOffCanvasSidebar {
        return ['grid-4-full', 'grid-5-full', 'grid-6-full'].includes(this.gridLayout) ? 'always' : 'mobile';
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private page: PageShopService,
        private shop: ShopApi,
        private location: Location,
        private url: UrlService,
        private language: LanguageService,
        private translate: TranslateService,
        private eCommerceService: ECommerceService,
        private appService: AppService,
    ) { }

    ngOnInit(): void {
        const data$: Observable<PageShopData> = this.route.data as Observable<PageShopData>;

        const category$: Observable<ShopCategory> = data$.pipe(map(data => data.category));
        // -->Page: title
        this.pageTitle$ = category$.pipe(
            switchMap(category => category ? of(category.name) : this.translate.stream('HEADER_SHOP')),
        );

        // -->Breadcrumb
        this.breadcrumbs$ = this.language.current$.pipe(
            switchMap(() => category$.pipe(
                map(category => [
                    { label: this.translate.instant('LINK_HOME'), url: this.url.home() },
                    { label: this.translate.instant('LINK_SHOP'), url: this.url.shop() },
                    ...getCategoryPath(category).map(x => ({ label: x.name, url: this.url.category(x) })),
                ]),
            )),
        );

        data$.subscribe((data: PageShopData) => {
            this.layout = data.layout;
            this.gridLayout = data.gridLayout;
            this.sidebarPosition = data.sidebarPosition;
        });


        data$.pipe(
            switchMap((data: PageShopData) => merge(
                of(data.productsList),
                this.page.optionsChange$.pipe(
                    map(() => {
                        this.updateUrl();

                        // todo: capture category id and not slug
                        // todo: capture category id and not slug
                        // todo: capture category id and not slug
                        const categorySlug: string = this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || undefined;

                        const opt =  {
                            ...this.page.options,
                            filters: {
                                ...this.page.options.filters,
                                category: categorySlug,
                            },
                        };
                        console.log("opt >>>>", opt)
                        // this.refresh(opt);
                        return opt;
                    }),
                    tap(() => this.page.isLoading = true),
                    // switchMap(options => this.shop.getProductsList(options)),
                ),
            )),
            takeUntil(this.destroy$),
        ).subscribe(options => {
            // this.page.isLoading = false;
            // this.page.setList(list);
            this.refresh(options);
        });

    }


    /**
     * Refresh products
     */
    public refresh(query2: any): void {
        // todo: add typescript to options
        // if (!this.status.isLoading()) {
        //     this.status.startLoading();
        // -->Prepare: query
        // const query = this.prepareQuery(query2);
        // -->Selected manufacturers
        const selectedManufacturerIds = query2?.filters?.manufacturer?.split(',')?.filter(f => f) || [];


        console.log("query >>>", query2)
        const filterRequest = {
            searchTerm: query2.searchTerm, // search name, description, itemId, manufacturerId, partId
            // categoryId: 1,
            manufacturerIds: selectedManufacturerIds,
            sortBy: 'name',
            sortOrder: query2.sort === 'name_asc' ? 1 : -1, // 1 = asc/ -1 = desc
            pageSize: query2.limit,
            minPrice: 0,
            maxPrice: 2500,
            pageNo: query2.page,
            calculateFilters: true
        };
        console.log("filter request >>>", filterRequest)
        // -->Execute
        this.eCommerceService.productsFilter(filterRequest).subscribe((res) => {
            // -->Check: res
            if (res && res.ok && res.data) {
                console.log("Response >>>>", res)
                // todo: map or change the structore
                // todo: map or change the structore
                // todo: map or change the structore
                // todo: map or change the structore
                // -->TODO: for future use, we will set `count` as 0 but when we add count for filters we will have to connect it


                const filters2 = [];
                // -->TODO: push filter for categories

                // -->TOdo: push filter for price
                filters2.push(buildPriceFilter(0, 2000, 10, 500));
                // -->Todo: push filter for manufacturers
                filters2.push(buildManufacturerFilter(res.data.vendorList, selectedManufacturerIds))

                console.log("filters2 >>>", filters2)
                // todo: change this
                // -->Set: data
                const list =  {
                    items: res.data.items || [],
                    filters: filters2,
                    page: res.data.page || 1,
                    limit: filterRequest.pageSize,
                    sort: query2.sort,
                    total: res.data.total,
                    pages: res.data.pages,
                    from: 0,
                    to: 20
                } as any;
                // -->Set: data
                this.page.isLoading = false;
                this.page.setList(list);
                // -->Set: done loader
                // this.status.doneLoading();
            } else {
                // this.status.error();
            }
        });
        // }
    }


    /**
     * @deprecated
     */

    /**
     * Update url
     */
    private updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }

    /**
     * Get query params
     */
    private getQueryParams(): Params {
        const params: Params = {};
        const options = this.page.options;
        const filterValues = options.filters || {};

        if ('page' in options && options.page !== this.page.defaultOptions.page) {
            params.page = options.page;
        }
        if ('limit' in options && options.limit !== this.page.defaultOptions.limit) {
            params.limit = options.limit;
        }
        if ('sort' in options && options.sort !== this.page.defaultOptions.sort) {
            params.sort = options.sort;
        }
        if ('filters' in options) {
            this.page.filters
                .map(
                    filter => ({
                        filter,
                        handler: filterHandlers.find(x => x.type === filter.type),
                    }),
                )
                .filter(
                    (x): x is {filter: Filter; handler: FilterHandler} => (
                        !!x.handler && !!filterValues[x.filter.slug]),
                    )
                .forEach(({ filter, handler }) => {
                    const value = handler.deserialize(filterValues[filter.slug]);

                    if (!handler.isDefaultValue(filter, value)) {
                        params[`filter_${filter.slug}`] = handler.serialize(value);
                    }
                });
        }

        return params;
    }


    /**
     * Temporary todo: remove htis
     */
    public getTempFilters(): any {
        const info$ = this.appService.appInfo.getValue();

        const filters =  [
            {
                "type": "category",
                "slug": "category",
                "name": "Categories",
                "items": [
                    {
                        "id": 1,
                        "type": "shop",
                        "name": "Headlights & Lighting",
                        "slug": "headlights-lighting",
                        "image": "assets/images/categories/category-1.jpg",
                        "items": 131,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 10,
                        "type": "shop",
                        "name": "Fuel System",
                        "slug": "fuel-system",
                        "image": "assets/images/categories/category-2.jpg",
                        "items": 356,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 16,
                        "type": "shop",
                        "name": "Body Parts",
                        "slug": "body-parts",
                        "image": "assets/images/categories/category-3.jpg",
                        "items": 54,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 22,
                        "type": "shop",
                        "name": "Interior Parts",
                        "slug": "interior-parts",
                        "image": "assets/images/categories/category-4.jpg",
                        "items": 274,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 30,
                        "type": "shop",
                        "name": "Tires & Wheels",
                        "slug": "tires-wheels",
                        "image": "assets/images/categories/category-5.jpg",
                        "items": 508,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 38,
                        "type": "shop",
                        "name": "Engine & Drivetrain",
                        "slug": "engine-drivetrain",
                        "image": "assets/images/categories/category-6.jpg",
                        "items": 95,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 46,
                        "type": "shop",
                        "name": "Oils & Lubricants",
                        "slug": "oils-lubricants",
                        "image": "assets/images/categories/category-7.jpg",
                        "items": 179,
                        "layout": "products",
                        "customFields": {}
                    },
                    {
                        "id": 47,
                        "type": "shop",
                        "name": "Tools & Garage",
                        "slug": "tools-garage",
                        "image": "assets/images/categories/category-8.jpg",
                        "items": 106,
                        "layout": "products",
                        "customFields": {}
                    }
                ]
            },
            {
                "type": "range",
                "slug": "price",
                "name": "Price",
                "min": 0,
                "max": 10000,
                "value": [
                    0,
                    10000
                ]
            }
        ];

        // todo: remove as any
        // filters.push(buildManufacturerFilter(info$.vendors) as any);

        return filters;
    }





    /**
     * Destroy
     */
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
