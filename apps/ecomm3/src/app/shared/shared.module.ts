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
import { CheckboxModule } from './_parts/checkbox/checkbox.module';
import { CollapseModule } from './_parts/collapse';
import { CurrencyModule } from './_parts/currency/currency.module';
import { RadioModule } from './_parts/radio/radio.module';

// components
import { AddressCardComponent } from './address-card/address-card.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { ArrowComponent } from './arrow/arrow.component';
import { BlockHeaderComponent } from './block-header/block-header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DecorComponent } from './decor/decor.component';
import { IconComponent } from './icon/icon.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { QuickViewComponent } from './quickview/quick-view.component';
import { RatingComponent } from './rating/rating.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { TermsComponent } from './terms/terms.component';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { TimerComponent } from './timer/timer.component';
import { WidgetCategoriesComponent } from './widget-categories/widget-categories.component';

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
import { AvatarIconComponent } from "./avatar-icon/avatar-icon.component";
import {ShowIfLoggedInDirective} from "./directives/show-if-logged-in.directive";
import {CheckImageFallbackPipe} from "./pipes/check-image-fallback.pipe";
import { BlockBrandsComponent } from './_parts/blocks/block-brands/block-brands.component';
import { BlockCategoriesComponent } from './_parts/blocks/block-categories/block-categories.component';
import { BlockFeaturesComponent } from './_parts/blocks/block-features/block-features.component';
import { BlockProductsCarouselComponent } from './_parts/blocks/block-products-carousel/block-products-carousel.component';
import { BlockProductsColumnsComponent } from './_parts/blocks/block-products-columns/block-products-columns.component';
import { BlockSaleComponent } from './_parts/blocks/block-sale/block-sale.component';
import { BlockSlideshowComponent } from './_parts/blocks/block-slideshow/block-slideshow.component';
import { FeaturedProductsGridComponent } from './_parts/blocks/featured-products-grid/featured-products-grid.component';


@NgModule({
    declarations: [
        AddressCardComponent,
        AddressFormComponent,
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
        RegisterFormComponent,
        SectionHeaderComponent,
        StatusBadgeComponent,
        TermsComponent,
        TermsModalComponent,
        TimerComponent,
        WidgetCategoriesComponent,
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
        AvatarIconComponent,
        ShowIfLoggedInDirective,
        CheckImageFallbackPipe,
        // blocks
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockProductsCarouselComponent,
        BlockProductsColumnsComponent,
        BlockSaleComponent,
        BlockSlideshowComponent,
        FeaturedProductsGridComponent
    ],
    exports: [
        // modules
        CheckboxModule,
        CurrencyModule,
        // components
        AddressCardComponent,
        AddressFormComponent,
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
        RegisterFormComponent,
        SectionHeaderComponent,
        StatusBadgeComponent,
        TermsComponent,
        TimerComponent,
        WidgetCategoriesComponent,
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
        AvatarIconComponent,
        ShowIfLoggedInDirective,
        CheckImageFallbackPipe,
        // blocks
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockProductsCarouselComponent,
        BlockProductsColumnsComponent,
        BlockSaleComponent,
        BlockSlideshowComponent,
        FeaturedProductsGridComponent
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
        TooltipModule,
        TranslateModule.forChild(),
        // modules
        CheckboxModule,
        CollapseModule,
        CurrencyModule,
        RadioModule
    ],
})
export class SharedModule { }
