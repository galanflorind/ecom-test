import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutPartsModule } from './_parts/layout.parts-module';
import { HeaderComponent } from './header/header.component';
import { MobileHeaderComponent } from './_parts/mobile-header/mobile-header.component';
import { MobileMenuComponent } from './_parts/mobile-menu/mobile-menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingBarComponent } from './_parts/loading-bar/loading-bar.component';
import { QuickViewComponent } from './_parts/quickview/quick-view.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        MobileHeaderComponent,
        MobileMenuComponent,
        QuickViewComponent,
        LoadingBarComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        LayoutPartsModule,
        SharedModule
    ]
})
export class LayoutModule { }
