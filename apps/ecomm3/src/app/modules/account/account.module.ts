import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

// components
import { LayoutComponent } from './components/layout/layout.component';

// pages
import { PageAddressesComponent } from './pages/page-addresses/page-addresses.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageInvoicesComponent } from './pages/page-invoices/page-invoices.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageRegisterComponent } from "./pages/page-register/page-register.component";
import {PageForgotPasswordComponent} from "./pages/page-forgot-password/page-forgot-password.component";


@NgModule({
    declarations: [
        // components
        LayoutComponent,
        // pages
        PageAddressesComponent,
        PageDashboardComponent,
        PageEditAddressComponent,
        PageLoginComponent,
        PageOrderDetailsComponent,
        PageInvoicesComponent,
        PagePasswordComponent,
        PageProfileComponent,
        PageRegisterComponent,
        PageForgotPasswordComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        TranslateModule.forChild(),
        // modules
        AccountRoutingModule,
        SharedModule,
    ],
})
export class AccountModule { }
