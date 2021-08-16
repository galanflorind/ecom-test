import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CurrencyModule } from './currency/currency.module';
import { AddToCartDirective } from '../directives/add-to-cart.directive';
import { AddToCompareDirective } from '../directives/add-to-compare.directive';
import { AddToWishlistDirective } from '../directives/add-to-wishlist.directive';
import { FakeSlidesDirective } from '../directives/fake-slides.directive';
import { CheckImageFallbackPipe } from '../pipes/check-image-fallback.pipe';
import { IconComponent } from './icon/icon.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { RatingComponent } from './rating/rating.component';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { TermsComponent } from './terms/terms.component';
import { AvatarIconComponent } from "./avatar-icon/avatar-icon.component";
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';


@NgModule({
    declarations: [
        AddToCartDirective,
        AddToCompareDirective,
        AddToWishlistDirective,
        CheckImageFallbackPipe,
        FakeSlidesDirective,
        IconComponent,
        InputNumberComponent,
        PaginationComponent,
        ProductCardComponent,
        ProductVariantsComponent,
        ProductGalleryComponent,
        RatingComponent,
        StatusBadgeComponent,
        TermsComponent,
        CheckboxComponent,
        RadioButtonComponent,
        AvatarIconComponent,
    ],
    exports: [
        CurrencyModule,
        AddToCartDirective,
        AddToCompareDirective,
        AddToWishlistDirective,
        CheckImageFallbackPipe,
        FakeSlidesDirective,
        IconComponent,
        InputNumberComponent,
        PaginationComponent,
        ProductCardComponent,
        ProductVariantsComponent,
        ProductGalleryComponent,
        RatingComponent,
        StatusBadgeComponent,
        TermsComponent,
        CheckboxComponent,
        RadioButtonComponent,
        AvatarIconComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CarouselModule,
        ModalModule.forChild(),
        ModalModule.forChild(),
        TooltipModule,
        TranslateModule.forChild(),
        CurrencyModule
    ]
})
export class SharedPartsModule { }
