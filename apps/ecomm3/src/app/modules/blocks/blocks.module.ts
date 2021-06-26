import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { BlockBannersComponent } from './block-banners/block-banners.component';
import { BlockBrandsComponent } from './block-brands/block-brands.component';
import { BlockCategoriesComponent } from './block-categories/block-categories.component';
import { BlockFeaturesComponent } from './block-features/block-features.component';
import { BlockFinderComponent } from './block-finder/block-finder.component';
import { BlockPostsCarouselComponent } from './block-posts-carousel/block-posts-carousel.component';
import { BlockProductsCarouselComponent } from './block-products-carousel/block-products-carousel.component';
import { BlockProductsColumnsComponent } from './block-products-columns/block-products-columns.component';
import { BlockSaleComponent } from './block-sale/block-sale.component';
import { BlockSlideshowComponent } from './block-slideshow/block-slideshow.component';
import { BlockZoneComponent } from './block-zone/block-zone.component';
import { FeaturedProductsGridComponent } from "./featured-products-grid/featured-products-grid.component";

@NgModule({
    declarations: [
        BlockBannersComponent,
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockFinderComponent,
        BlockPostsCarouselComponent,
        BlockProductsCarouselComponent,
        BlockProductsColumnsComponent,
        BlockSaleComponent,
        BlockSlideshowComponent,
        BlockZoneComponent,
        FeaturedProductsGridComponent
    ],
    exports: [
        BlockBannersComponent,
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockFinderComponent,
        BlockPostsCarouselComponent,
        BlockProductsCarouselComponent,
        BlockProductsColumnsComponent,
        BlockSaleComponent,
        BlockSlideshowComponent,
        BlockZoneComponent,
        FeaturedProductsGridComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CarouselModule,
        TranslateModule.forChild(),
        SharedModule,
    ],
})
export class BlocksModule { }
