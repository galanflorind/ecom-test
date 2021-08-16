import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { SharedModule } from '../../shared/shared.module';

// components
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DropcartComponent } from './dropcart/dropcart.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { LogoComponent } from './logo/logo.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MegamenuComponent } from './megamenu/megamenu.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MobileMenuIndicatorsComponent } from './mobile-menu-indicators/mobile-menu-indicators.component';
import { MobileMenuLinksComponent } from './mobile-menu-links/mobile-menu-links.component';
import { MobileMenuPanelComponent } from './mobile-menu-panel/mobile-menu-panel.component';
import { MobileMenuSettingsComponent } from './mobile-menu-settings/mobile-menu-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AccountMenuComponent,
        DepartmentsComponent,
        DropcartComponent,
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
    ],
    exports: [
        MobileHeaderComponent,
        MobileMenuComponent,
        AccountMenuComponent,
        DepartmentsComponent,
        DropcartComponent,
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
export class LayoutPartsModule { }
