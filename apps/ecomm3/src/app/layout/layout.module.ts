import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { SharedModule } from '../shared/shared.module';

// components
import { AccountMenuComponent } from './_parts/account-menu/account-menu.component';
import { DepartmentsComponent } from './_parts/departments/departments.component';
import { DropcartComponent } from './_parts/dropcart/dropcart.component';
import { HeaderComponent } from './header/header.component';
import { IndicatorComponent } from './_parts/indicator/indicator.component';
import { LogoComponent } from './_parts/logo/logo.component';
import { MainMenuComponent } from './_parts/main-menu/main-menu.component';
import { MegamenuComponent } from './_parts/megamenu/megamenu.component';
import { MenuComponent } from './_parts/menu/menu.component';
import { SearchComponent } from './_parts/search/search.component';
import { TopbarComponent } from './_parts/topbar/topbar.component';
import { MobileHeaderComponent } from './_parts/mobile-header/mobile-header.component';
import { MobileMenuComponent } from './_parts/mobile-menu/mobile-menu.component';
import { MobileMenuIndicatorsComponent } from './_parts/mobile-menu-indicators/mobile-menu-indicators.component';
import { MobileMenuLinksComponent } from './_parts/mobile-menu-links/mobile-menu-links.component';
import { MobileMenuPanelComponent } from './_parts/mobile-menu-panel/mobile-menu-panel.component';
import { MobileMenuSettingsComponent } from './_parts/mobile-menu-settings/mobile-menu-settings.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        // components
        AccountMenuComponent,
        DepartmentsComponent,
        DropcartComponent,
        HeaderComponent,
        IndicatorComponent,
        IndicatorComponent,
        LogoComponent,
        MainMenuComponent,
        MegamenuComponent,
        MenuComponent,
        SearchComponent,
        TopbarComponent,
        MobileHeaderComponent,
        MobileMenuComponent,
        MobileMenuIndicatorsComponent,
        MobileMenuLinksComponent,
        MobileMenuPanelComponent,
        MobileMenuSettingsComponent,
        FooterComponent
    ],
    exports: [
        // components
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
    ],
})
export class LayoutModule { }
