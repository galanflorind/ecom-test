import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule } from '@ngx-translate/core';
// modules
import { CurrencyModule } from './_parts/currency/currency.module';

// components
import { AddressCardComponent } from '../account/_parts/address-card/address-card.component';
import { ArrowComponent } from '../shop/_parts/arrow/arrow.component';
import { BlockHeaderComponent } from '../shop/_parts/block-header/block-header.component';
import { BreadcrumbComponent } from '../shop/_parts/breadcrumb/breadcrumb.component';
import { DecorComponent } from '../layout/_parts/decor/decor.component';
import { IconComponent } from './_parts/icon/icon.component';
import { InputNumberComponent } from './_parts/input-number/input-number.component';
import { LoadingBarComponent } from '../layout/_parts/loading-bar/loading-bar.component';
import { PaginationComponent } from './_parts/pagination/pagination.component';
import { ProductCardComponent } from './_parts/product-card/product-card.component';
import { ProductVariantsComponent } from './_parts/product-variants/product-variants.component';
import { ProductGalleryComponent } from './_parts/product-gallery/product-gallery.component';
import { QuickViewComponent } from '../layout/_parts/quickview/quick-view.component';
import { RatingComponent } from './_parts/rating/rating.component';
import { SectionHeaderComponent } from '../shop/_parts/section-header/section-header.component';
import { StatusBadgeComponent } from './_parts/status-badge/status-badge.component';
import { TermsComponent } from './_parts/terms/terms.component';
import { AvatarIconComponent } from "./_parts/avatar-icon/avatar-icon.component";
import { BlockBrandsComponent } from '../shop/_parts/block-brands/block-brands.component';
import { BlockFeaturesComponent } from '../home/_parts/block-features/block-features.component';
import { BlockProductsCarouselComponent } from '../shop/_parts/block-products-carousel/block-products-carousel.component';
import { FeaturedProductsGridComponent } from '../home/_parts/featured-products-grid/featured-products-grid.component';
import { CheckboxComponent } from './_parts/checkbox/checkbox.component';
import { RadioButtonComponent } from './_parts/radio-button/radio-button.component';

// directives
import { AddToCartDirective } from './directives/add-to-cart.directive';
import { AddToCompareDirective } from './directives/add-to-compare.directive';
import { AddToWishlistDirective } from './directives/add-to-wishlist.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { FakeSlidesDirective } from './directives/fake-slides.directive';
import { OwlPreventClickDirective } from './directives/owl-prevent-click.directive';
import { RemoveFromCartDirective } from './directives/remove-from-cart.directive';
import { RemoveFromCompareDirective } from './directives/remove-from-compare.directive';
import { RemoveFromWishlistDirective } from './directives/remove-from-wishlist.directive';
import { SplitStringDirective } from './directives/split-string.directive';
import {ShowIfLoggedInDirective} from "./directives/show-if-logged-in.directive";
import { CollapseItemDirective } from './directives/collapse-item.directive';
import { CollapseContentDirective } from './directives/collapse-content.directive';
import { CheckboxGroupDirective } from './directives/checkbox-group.directive';
import { RadioGroupDirective } from './directives/radio-group.directive';

// pipes
import { ActiveFilterLabelPipe } from './pipes/active-filter-label.pipe';
import { CompatibilityToStatusBadgeIconPipe } from './pipes/compatibility-to-status-badge-icon.pipe';
import { CompatibilityToStatusBadgeTextPipe } from './pipes/compatibility-to-status-badge-text.pipe';
import { CompatibilityToStatusBadgeTypePipe } from './pipes/compatibility-to-status-badge-type.pipe';
import { GetProductImagePipe } from './pipes/get-product-image.pipe';
import { HasErrorPipe } from './pipes/has-error.pipe';
import { IsInvalidPipe } from './pipes/is-invalid.pipe';
import { StockToStatusBadgeTextPipe } from './pipes/stock-to-status-badge-text.pipe';
import { StockToStatusBadgeTypePipe } from './pipes/stock-to-status-badge-type.pipe';
import {CheckImageFallbackPipe} from "./pipes/check-image-fallback.pipe";


@NgModule({
    declarations: [
        AddressCardComponent,
        ArrowComponent,
        BlockHeaderComponent,
        BreadcrumbComponent,
        DecorComponent,
        IconComponent,
        InputNumberComponent,
        LoadingBarComponent,
        PaginationComponent,
        ProductCardComponent,
        ProductVariantsComponent,
        ProductGalleryComponent,
        QuickViewComponent,
        RatingComponent,
        SectionHeaderComponent,
        StatusBadgeComponent,
        TermsComponent,
        CheckboxComponent,
        RadioButtonComponent,
        BlockBrandsComponent,
        BlockFeaturesComponent,
        BlockProductsCarouselComponent,
        FeaturedProductsGridComponent,
        AvatarIconComponent,
        // directives
        AddToCartDirective,
        AddToCompareDirective,
        AddToWishlistDirective,
        DropdownDirective,
        FakeSlidesDirective,
        OwlPreventClickDirective,
        RemoveFromCartDirective,
        RemoveFromCompareDirective,
        RemoveFromWishlistDirective,
        SplitStringDirective,
        CollapseItemDirective,
        CollapseContentDirective,
        CheckboxGroupDirective,
        RadioGroupDirective,
        ShowIfLoggedInDirective,
        // pipes
        ActiveFilterLabelPipe,
        CompatibilityToStatusBadgeIconPipe,
        CompatibilityToStatusBadgeTextPipe,
        CompatibilityToStatusBadgeTypePipe,
        GetProductImagePipe,
        HasErrorPipe,
        IsInvalidPipe,
        StockToStatusBadgeTextPipe,
        StockToStatusBadgeTypePipe,
        CheckImageFallbackPipe
    ],
    exports: [
        // modules
        CurrencyModule,
        // components
        AddressCardComponent,
        ArrowComponent,
        BlockHeaderComponent,
        DecorComponent,
        IconComponent,
        InputNumberComponent,
        LoadingBarComponent,
        PaginationComponent,
        ProductCardComponent,
        ProductVariantsComponent,
        ProductGalleryComponent,
        QuickViewComponent,
        RatingComponent,
        SectionHeaderComponent,
        StatusBadgeComponent,
        TermsComponent,
        CheckboxComponent,
        RadioButtonComponent,
        BlockBrandsComponent,
        BlockFeaturesComponent,
        BlockProductsCarouselComponent,
        FeaturedProductsGridComponent,
        AvatarIconComponent,
        // directives
        AddToCartDirective,
        AddToCompareDirective,
        AddToWishlistDirective,
        DropdownDirective,
        FakeSlidesDirective,
        OwlPreventClickDirective,
        RemoveFromCartDirective,
        RemoveFromCompareDirective,
        RemoveFromWishlistDirective,
        SplitStringDirective,
        CollapseItemDirective,
        CollapseContentDirective,
        CheckboxGroupDirective,
        RadioGroupDirective,
        ShowIfLoggedInDirective,
        // pipes
        ActiveFilterLabelPipe,
        CompatibilityToStatusBadgeIconPipe,
        CompatibilityToStatusBadgeTextPipe,
        CompatibilityToStatusBadgeTypePipe,
        GetProductImagePipe,
        HasErrorPipe,
        IsInvalidPipe,
        StockToStatusBadgeTextPipe,
        StockToStatusBadgeTypePipe,
        CheckImageFallbackPipe
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // modules (third-party)
        CarouselModule,
        ModalModule.forChild(),
        ModalModule.forChild(),
        TooltipModule,
        TranslateModule.forChild(),
        // modules
        CurrencyModule
    ],
})
export class SharedModule { }
