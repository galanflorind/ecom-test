import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductsViewComponent } from './_parts/products-view/products-view.component';
import { ProductTabComponent } from './_parts/product-tab/product-tab.component';
import { ProductTabsComponent } from './_parts/product-tabs/product-tabs.component';
import { ShopSidebarComponent } from './_parts/shop-sidebar/shop-sidebar.component';
import { SpecComponent } from './_parts/spec/spec.component';
import { PageCartComponent } from './page-cart/page-cart.component';
import { PageCheckoutComponent } from './page-checkout/page-checkout.component';
import { PageCompareComponent } from './page-compare/page-compare.component';
import { PageProductComponent } from './page-product/page-product.component';
import { PageShopComponent } from './page-shop/page-shop.component';
import { PageTrackOrderComponent } from './page-track-order/page-track-order.component';
import { PageWishlistComponent } from './page-wishlist/page-wishlist.component';
import { WidgetCategoriesListComponent } from './_parts/widget-categories-list/widget-categories-list.component';
import { WidgetFiltersComponent } from './_parts/widget-filters/widget-filters.component';
import { WidgetProductsComponent } from './_parts/widget-products/widget-products.component';
import { FilterCategoryComponent } from './filters/filter-category/filter-category.component';
import { FilterCheckComponent } from './filters/filter-check/filter-check.component';
import { FilterColorComponent } from './filters/filter-color/filter-color.component';
import { FilterRadioComponent } from './filters/filter-radio/filter-radio.component';
import { FilterRangeComponent } from './filters/filter-range/filter-range.component';
import { FilterRatingComponent } from './filters/filter-rating/filter-rating.component';
import { NaoLoadingComponent } from "./_parts/nao-loading/nao-loading.component";
import { TermsModalComponent } from './_parts/terms-modal/terms-modal.component';
import { WidgetCategoriesComponent } from './_parts/widget-categories/widget-categories.component';


@NgModule({
    declarations: [
        ProductsViewComponent,
        ProductTabComponent,
        ProductTabsComponent,
        ShopSidebarComponent,
        SpecComponent,
        NaoLoadingComponent,
        PageCartComponent,
        PageCheckoutComponent,
        PageCompareComponent,
        PageProductComponent,
        PageShopComponent,
        PageTrackOrderComponent,
        PageWishlistComponent,
        WidgetCategoriesListComponent,
        WidgetFiltersComponent,
        WidgetProductsComponent,
        FilterCategoryComponent,
        FilterCheckComponent,
        FilterColorComponent,
        FilterRadioComponent,
        FilterRangeComponent,
        FilterRatingComponent,
        TermsModalComponent,
        WidgetCategoriesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CarouselModule,
        NgxPayPalModule,
        NgxSliderModule,
        TranslateModule.forChild(),
        SharedModule,
        ShopRoutingModule,
    ],
})
export class ShopModule { }
