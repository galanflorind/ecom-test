import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';
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
import { DecorComponent } from './decor/decor.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { QuickViewComponent } from './quickview/quick-view.component';


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
        DecorComponent,
        LoadingBarComponent,
        QuickViewComponent
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
        DecorComponent,
        LoadingBarComponent,
        QuickViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        ModalModule.forChild(),
        SharedModule,
    ]
})
export class LayoutPartsModule { }
