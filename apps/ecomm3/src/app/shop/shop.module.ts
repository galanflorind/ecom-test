import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TranslateModule } from '@ngx-translate/core';
import { BlocksModule } from '../shared/_parts/blocks/blocks.module';
import { CollapseModule } from '../shared/_parts/collapse';
import { RadioModule } from '../shared/_parts/radio/radio.module';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductTabComponent } from './components/product-tab/product-tab.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { ShopSidebarComponent } from './components/shop-sidebar/shop-sidebar.component';
import { SpecComponent } from './components/spec/spec.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from './pages/page-compare/page-compare.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageShopComponent } from './pages/page-shop/page-shop.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { WidgetCategoriesListComponent } from './widgets/widget-categories-list/widget-categories-list.component';
import { WidgetFiltersComponent } from './widgets/widget-filters/widget-filters.component';
import { WidgetProductsComponent } from './widgets/widget-products/widget-products.component';
import { FilterCategoryComponent } from './filters/filter-category/filter-category.component';
import { FilterCheckComponent } from './filters/filter-check/filter-check.component';
import { FilterColorComponent } from './filters/filter-color/filter-color.component';
import { FilterRadioComponent } from './filters/filter-radio/filter-radio.component';
import { FilterRangeComponent } from './filters/filter-range/filter-range.component';
import { FilterRatingComponent } from './filters/filter-rating/filter-rating.component';
import { NaoLoadingComponent } from "./components/nao-loading/nao-loading.component";


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
        BlocksModule,
        CollapseModule,
        RadioModule,
        ShopRoutingModule,
    ],
})
export class ShopModule { }
