import { LayoutPartsModule } from './_parts/layout.parts-module';
import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { SharedModule } from '../shared/shared.module';

// components
import { HeaderComponent } from './header/header.component';
import { MobileHeaderComponent } from './_parts/mobile-header/mobile-header.component';
import { MobileMenuComponent } from './_parts/mobile-menu/mobile-menu.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        MobileHeaderComponent,
        MobileMenuComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        TranslateModule.forChild(),
        // modules
        SharedModule,
        LayoutPartsModule
    ],
})
export class LayoutModule { }
