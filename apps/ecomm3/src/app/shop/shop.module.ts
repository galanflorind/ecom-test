import { ShopPartsModule } from './_parts/shop.parts-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop.routing.module';
import { PageCartComponent } from './page-cart/page-cart.component';
import { PageCheckoutComponent } from './page-checkout/page-checkout.component';
import { PageCompareComponent } from './page-compare/page-compare.component';
import { PageProductComponent } from './page-product/page-product.component';
import { PageShopComponent } from './page-shop/page-shop.component';
import { PageTrackOrderComponent } from './page-track-order/page-track-order.component';
import { PageWishlistComponent } from './page-wishlist/page-wishlist.component';


@NgModule({
    declarations: [
        PageCartComponent,
        PageCheckoutComponent,
        PageCompareComponent,
        PageProductComponent,
        PageShopComponent,
        PageTrackOrderComponent,
        PageWishlistComponent,
    ],
    imports: [
        NgxPayPalModule,
        NgxSliderModule,
        SharedModule,
        ShopRoutingModule,
        ShopPartsModule
    ],
})
export class ShopModule { }
