import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopCategory } from '../../../../interfaces/category';
import { UrlService } from '../../../../services/url.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../../../interfaces/product';
import { Brand } from '../../../../interfaces/brand';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../language/services/language.service';
import { getCategoryPath } from '../../../../functions/utils';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';

interface AsyncData<T> {
    data$: Observable<T>;
    loading: boolean;
}

function asyncData<T>(source$: Observable<T>): AsyncData<T> {
    const container: AsyncData<T> = {
        data$: of(null).pipe(
            tap(() => container.loading = true),
            switchMap(() => source$),
            tap(() => container.loading = false),
        ),
        loading: false,
    };

    return container;
}

export type PageCategoryLayout =
    'columns-3-sidebar' |
    'columns-4-sidebar' |
    'columns-5-sidebar' |
    'columns-4-full' |
    'columns-5-full' |
    'columns-6-full' |
    'columns-7-full';

export type PageCategorySidebarPosition = 'start' | 'end';

export interface PageCategoryData {
    layout?: PageCategoryLayout;
    sidebarPosition?: PageCategorySidebarPosition;
    category?: ShopCategory;
    children?: ShopCategory[];
}

@Component({
    selector: 'app-page-category',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss'],
})
export class PageCategoryComponent implements OnInit {
    public layout: PageCategoryLayout = 'columns-4-full';
    public sidebarPosition: PageCategorySidebarPosition = 'start';
    public category$!: Observable<ShopCategory|null>;
    public children$!: Observable<ShopCategory[]>;
    public pageTitle$!: Observable<string>;
    public breadcrumbs$!: Observable<BreadcrumbItem[]>;
    public bestsellers!: AsyncData<Product[]>;
    public featured!: AsyncData<Product[]>;
    public brands$!: Observable<Brand[]>;
    public latest$!: Observable<Product[]>;

    public get hasSidebar(): boolean {
        return this.layout.endsWith('-sidebar');
    }

    constructor(
        private route: ActivatedRoute,
        private translate: TranslateService,
        private language: LanguageService,
        public url: UrlService,
    ) { }

    public ngOnInit(): void {
        // -->Subscribe: to layout and sidebar position updates
        this.route.data.subscribe((data: PageCategoryData) => {
            this.layout = data.layout || 'columns-4-full';
            this.sidebarPosition = data.sidebarPosition || 'start';
        });

        // -->Set: category from data
        this.category$ = this.route.data.pipe(
            map((data: PageCategoryData) => data.category || null)
        );

        // -->Set: children categories
        this.children$ = this.route.data.pipe(
            map((data: PageCategoryData) => data.category ? data.category.children : data.children),
            map(categories => categories || [])
        );

        // -->Set: page title from category
        this.pageTitle$ = this.category$.pipe(
            mergeMap(category => category ? of(category.name) : this.translate.stream('HEADER_SHOP'))
        );

        // -->Set: breadcrumbs
        this.breadcrumbs$ = this.language.current$.pipe(
            switchMap(() => this.category$.pipe(
                map(category => {
                    const categoryPath = category ? getCategoryPath(category) : [];

                    return [
                        {
                            label: this.translate.instant('LINK_HOME'),
                            url: this.url.home()
                        },
                        {
                            label: this.translate.instant('LINK_SHOP'),
                            url: this.url.shop()
                        },
                        ...categoryPath.map((x) => ({
                            label: x.name,
                            url: this.url.category(x)
                        })),
                    ];
                })
            ))
        );

        // this.bestsellers = asyncData(this.shop.getPopularProducts(null, 8));

        // this.featured = asyncData(this.shop.getFeaturedProducts(null, 8));

        // this.brands$ = this.shop.getBrands({ limit: (this.hasSidebar ? 7 : 8) * 2 });

        // if (this.hasSidebar) {
        //     this.latest$ = this.shop.getLatestProducts(5);
        // }
    }
}
