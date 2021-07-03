import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Product,
    ProductAttribute,
    ProductAttributeGroup,
    ProductCompatibilityResult,
} from '../../../../interfaces/product';
import { ProductGalleryLayout } from '../../../shared/components/product-gallery/product-gallery.component';
import { UrlService } from '../../../../services/url.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../../services/cart.service';
import { finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import {Observable, of, Subject, Subscription} from 'rxjs';
import { getCategoryPath } from '../../../../functions/utils';
import { LanguageService } from '../../../language/services/language.service';
import { BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';
import {NaoSettingsInterface} from "@naologic/nao-interfaces";
import {AppService} from "../../../../app.service";
import {ECommerceService} from "../../../../e-commerce.service";

export type PageProductLayout = 'sidebar' | 'full';

export type PageProductSidebarPosition = 'start' | 'end';

export interface PageProductData {
    layout: PageProductLayout;
    sidebarPosition: PageProductSidebarPosition;
    product: Product;
}

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit, OnDestroy {
    @ViewChild('tabs', { read: ElementRef }) tabsElementRef!: ElementRef;

    private destroy$: Subject<void> = new Subject<void>();
    public appSettings: NaoSettingsInterface.Settings;
    public breadcrumb$!: Observable<BreadcrumbItem[]>;
    public product!: Product;
    public featuredAttributes: ProductAttribute[] = [];
    public spec: ProductAttributeGroup[] = [];
    public form!: FormGroup;
    public addToCartInProgress = false;

    public docId;
    // -->Based on this index we show specifications and price
    public variantIndex = 0;
    public subs = new Subscription();

    get tabsElement(): HTMLElement {
        return this.tabsElementRef.nativeElement;
    }


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private language: LanguageService,
        private cart: CartService,
        public url: UrlService,
        private appService: AppService,
        private eCommerceService: ECommerceService,
    ) { }

    ngOnInit(): void {
        // -->Set: app settings
        this.appSettings = this.appService.settings.getValue();

        const data$ = this.route.data as Observable<PageProductData>;
        const product$ = data$.pipe(map((data: PageProductData) => data.product));

        // data$.subscribe((data: PageProductData) => {
        //     this.layout = data.layout;
        //     this.sidebarPosition = data.sidebarPosition;
        //     this.product = data.product;
        //     this.featuredAttributes = this.product.attributes.filter(x => x.featured);
        //
        //     this.spec = this.product.type.attributeGroups.map(group => ({
        //         ...group,
        //         attributes: group.attributes.map(attribute => (
        //             this.product.attributes.find(x => x.slug === attribute) || null
        //         )).filter((x): x is ProductAttribute => x !== null),
        //     })).filter(x => x.attributes.length > 0);
        // });

        // todo: add breadcrumb in refresh
        this.breadcrumb$ = this.language.current$.pipe(
            switchMap(() => product$.pipe(
                map(product => {
                    // const categoryPath = product.categories ? getCategoryPath(product.categories[0]) : [];

                    return [
                        { label: this.translate.instant('LINK_HOME'), url: '/' },
                        { label: this.translate.instant('LINK_SHOP'), url: this.url.shop() },
                        // ...categoryPath.map(x => ({ label: x.name, url: this.url.category(x) })),
                        // { label: product.name, url: '/' },
                    ];
                }),
            )),
        );

        // data$.pipe(
        //     map((data: PageProductData) => data.product),
        //     switchMap(product => {
        //         if (!product) {
        //             return of([]);
        //         }
        //
        //         return this.shop.getRelatedProducts(product.id, 8);
        //     }),
        //     takeUntil(this.destroy$),
        // ).subscribe(x => this.relatedProducts = x);

        this.route.params
        .subscribe(params => {
            console.log("params>>>", params); // { orderby: "price" }
            // -->Set: docId
            this.docId = params.productId;
            // -->Refresh
            this.refresh()
            }
        );


        this.form = this.fb.group({
            options: [{}],
            quantity: [1, [Validators.required]],
        });

    }

    /**
     * Refresh
     */
    public refresh(): void {
        if (!this.docId) {
            // -->Redirect
            this.router.navigateByUrl(this.url.allProducts()).then();
            return
        }
        this.eCommerceService.productsGet(this.docId).subscribe(res =>{
            // todo; validate
            console.log("res >>>", res)
            this.product = res?.data[0] || null;

            if (!this.product || !this.product.data) {
                // -->Redirect
                this.router.navigateByUrl(this.url.allProducts()).then();
            }
            // -->Refresh: specifications
            this.refreshSpecifications();



            // todo: we need to unsubscribe on each refresh???
            // -->Subscribe: to options change and change the variant id
            this.subs.add(
                this.form.get('options').valueChanges.subscribe(value => {
                    console.log("valueeee", value)
                    // -->Match: search for variant index
                    const index = this.product.data.variants.findIndex(v => v.id === value?.variantId);
                    // -->Set: variant index
                    if (index > -1) {
                        this.variantIndex = index;
                    }
                    // -->Refresh: specifications
                    this.refreshSpecifications();


                })
            )
        }, err => {
            // todo: check
        })
    }


    /**
     * Refresh: specifications based on new variant
     */
    public refreshSpecifications(): void {
        // -->Set: featuredAttributes

        // -->Set: spec
    }

    /**
     * Scroll to tabs
     */
    public scrollToTabs(): void {
        this.tabsElement.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Add to card
     */
    public addToCart(): void {
        if (this.addToCartInProgress) {
            return;
        }
        if (this.form.get('quantity')!.invalid) {
            alert(this.translate.instant('ERROR_ADD_TO_CART_QUANTITY'));
            return;
        }
        if (this.form.get('options')!.invalid) {
            alert(this.translate.instant('ERROR_ADD_TO_CART_OPTIONS'));
            return;
        }

        const options: {name: string; value: string}[] = [];
        const formOptions = this.form.get('options')!.value;

        Object.keys(formOptions).forEach(optionSlug => {
            const option = this.product.options.find(x => x.slug === optionSlug);

            if (!option) {
                return;
            }

            const value = option.values.find(x => x.slug === formOptions[optionSlug]);

            if (!value) {
                return;
            }

            options.push({ name: option.name, value: value.name });
        });

        this.addToCartInProgress = true;

        this.cart.add(this.product, this.form.get('quantity')!.value, options).pipe(
            finalize(() => this.addToCartInProgress = false),
        ).subscribe();
    }

    /**
     * Compatibility
     */
    public compatibility(): ProductCompatibilityResult {
        if (this.product.compatibility === 'all') {
            return 'all';
        }
        if (this.product.compatibility === 'unknown') {
            return 'unknown';
        }
        // if (this.vehicle && this.product.compatibility.includes(this.vehicle.id)) {
        //     return 'fit';
        // } else {
        //     return 'not-fit';
        // }
    }

    public ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
