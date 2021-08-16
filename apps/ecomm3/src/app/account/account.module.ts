import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { PageAddressesComponent } from './_parts/page-addresses/page-addresses.component';
import { PageDashboardComponent } from './_parts/page-dashboard/page-dashboard.component';
import { PageEditAddressComponent } from './_parts/page-edit-address/page-edit-address.component';
import { PageLoginComponent } from './_parts/page-login/page-login.component';
import { PageInvoicesComponent } from './_parts/page-invoices/page-invoices.component';
import { PagePasswordComponent } from './_parts/page-password/page-password.component';
import { PageProfileComponent } from './_parts/page-profile/page-profile.component';
import { PageRegisterComponent } from "./_parts/page-register/page-register.component";
import { PageForgotPasswordComponent } from "./_parts/page-forgot-password/page-forgot-password.component";
//component

@NgModule({
    declarations: [
        LayoutComponent,
        PageAddressesComponent,
        PageDashboardComponent,
        PageEditAddressComponent,
        PageLoginComponent,
        PageInvoicesComponent,
        PagePasswordComponent,
        PageProfileComponent,
        PageRegisterComponent,
        PageForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        AccountRoutingModule,
        SharedModule,
    ],
})
export class AccountModule { }
