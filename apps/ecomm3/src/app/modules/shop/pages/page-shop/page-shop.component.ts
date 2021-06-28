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
import {buildManufacturerFilter} from "../../filters/filter.utils.static";

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
        PageShopService,
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

        // todo: do we need this??????
        // todo: do we need this??????
        // todo: do we need this??????
        // todo: do we need this??????
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
                        this.refresh(opt);
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
    public refresh(opt: any): void {
        // todo: add typescript to options
        // if (!this.status.isLoading()) {
        //     this.status.startLoading();
        // -->Prepare: query
        const query = this.prepareQuery(opt);
        console.log("query >>>", query)
        // -->Execute
        this.eCommerceService.productsFilter(query).subscribe((res) => {
            // -->Check: res
            if (res && res.ok && Array.isArray(res.data)) {
                console.log("Response >>>>", res)
                // todo: map or change the structore
                // todo: map or change the structore
                // todo: map or change the structore
                // todo: map or change the structore
                // -->TODO: for future use, we will set `count` as 0 but when we add count for filters we will have to connect it
                // -->Set: data
                const list =  {
                    items: res.data || [],
                    filters: this.getTempFilters(),
                    page: 1,
                    limit: 20,
                    sort: 'default',
                    total: res.meta?.totalHits || 0,
                    pages: 100,
                    from: 0,
                    to: 20
                } as any;
                // -->Set: data
                this.page.isLoading = false;
                this.page.setList(list);
                // -->Set: the pagination
                if (res.meta) {
                    // -->Set: pages
                    // this.search.pageMeta$.next({
                    //     totalRows: res.meta.totalHits || 0,
                    // });
                }
                // -->Set: done loader
                // this.status.doneLoading();
            } else {
                // this.status.error();
            }
        });
        // }
    }

    /**
     * Refactor
     */
    public search = {
        pageQuery$: new BehaviorSubject<any>({ options: {} }),
        pageMeta$: new BehaviorSubject<{totalRows: number; }>({totalRows: 0}),
        filters$: new BehaviorSubject(null),
        categoryId$: new BehaviorSubject<string>(''),
        categoryId: '',
        searchQuery$: new BehaviorSubject<any>({query: [], sorts: [], options: { sort: [['info.createdAt', -1]] }})
    };

    public sort = {
        lastSort: 'createdAt',
        by: new BehaviorSubject<string>('data.name'),
        reverse: true,
        sorts: new BehaviorSubject([]),
    };


    /**
     * Prepare query
     */
    public prepareQuery(options): any {
        const query = this.search.searchQuery$.getValue();

        // -->Set: pagination options
        query.options = {
            ...query.options,
            ...this.search.pageQuery$.getValue().options,
            sort: this.sort.sorts.getValue()
        };


        /**
         * Price: query
         */
            // -->Get: slider price todo
        const [gte, lte] = [0, 20000];
        // const [gte, lte] = this.formGroup.get('sliderPrice').value;

        // -->Set: query for filter
        query.query = {
            $and: [
                { 'data.variants.0.price': { $gte: gte || 0 } },
                { 'data.variants.0.price': { $lte: lte || 100000 } },
            ]
        };

        // -->Check: if there is a category selected
        if (this.search.categoryId$.getValue() && Number(this.search.categoryId$.getValue())) {
            // -->Push: query
            query.query.$and.push({ 'data.categories.id': { $eq: Number(this.search.categoryId$.getValue()) } });
        }

        // console.log("options.filters >>>", options?.filters)


        /**
         * Manufacturers query
         */
        // if (options?.filters?.manufacturer) {
        //     // -->Check: if it's array of ids or just one id
        //     if (options.filters.manufacturer.includes(',')) {
        //         // -->Push: query
        //         query.query.$and.push({ 'data.manufacturerId': { $in: options.filters.manufacturer.split(',') }});
        //     } else {
        //         // -->Push: query
        //         query.query.$and.push({ 'data.manufacturerId': { $eq: options.filters.manufacturer }});
        //     }
        // }

        /**
         * Search: query
         */

        // todo:
        // -->Check: if there is a product searched
        // if (this.queryParams && this.queryParams.search) {
        //     const querySearch = {
        //         $or: [
        //             {'data.name': {$regex: `${this.queryParams.search}`, $options : 'i'}},
        //             {'data.manufacturerProductId': { $eq: this.queryParams.search }}
        //         ]
        //     };
        //     query.query.$and.push(querySearch);
        // }

        /**
         * Categories query
         */


        // -->Return
        return query;
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
        filters.push(buildManufacturerFilter(info$.vendors) as any);

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
