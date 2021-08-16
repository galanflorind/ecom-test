import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from '../home.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FeaturedProductsGridComponent } from './featured-products-grid/featured-products-grid.component';
import { BlockFeaturesComponent } from './block-features/block-features.component';

@NgModule({
    declarations: [
        BlockFeaturesComponent,
        FeaturedProductsGridComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        HomeRoutingModule,
        SharedModule
    ],
    exports: [
        BlockFeaturesComponent,
        FeaturedProductsGridComponent
    ]
})
export class HomePartsModule { }
