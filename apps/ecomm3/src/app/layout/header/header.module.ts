import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { SharedModule } from '../../shared/shared.module';

// components
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DropcartComponent } from './dropcart/dropcart.component';
import { HeaderComponent } from './header.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { LogoComponent } from './logo/logo.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MegamenuComponent } from './megamenu/megamenu.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { TopbarComponent } from './topbar/topbar.component';

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
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // modules (third-party)
        TranslateModule.forChild(),
        // modules
        SharedModule,
    ],
    exports: [
        HeaderComponent,
    ],
})
export class HeaderModule { }
