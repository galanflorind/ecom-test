import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageAddressesComponent } from './_parts/page-addresses/page-addresses.component';
import { PageDashboardComponent } from './_parts/page-dashboard/page-dashboard.component';
import { PageEditAddressComponent } from './_parts/page-edit-address/page-edit-address.component';
import { PageLoginComponent } from './_parts/page-login/page-login.component';
import { PageInvoicesComponent } from './_parts/page-invoices/page-invoices.component';
import { PagePasswordComponent } from './_parts/page-password/page-password.component';
import { PageProfileComponent } from './_parts/page-profile/page-profile.component';
import { PageRegisterComponent } from "./_parts/page-register/page-register.component";
import { NaoUserPermissionsGuard } from "@naologic/nao-user-access";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            {
                path: 'dashboard',
                component: PageDashboardComponent,
            },

            {
                path: 'profile',
                component: PageProfileComponent,
            },
            {
                path: 'invoices',
                component: PageInvoicesComponent,
            },
            {
                path: 'addresses',
                component: PageAddressesComponent,
            },
            {
                path: 'addresses/new',
                component: PageEditAddressComponent,
            },
            {
                path: 'addresses/:id',
                component: PageEditAddressComponent,
            },
            {
                path: 'password',
                component: PagePasswordComponent,
            },
        ],
        canActivate: [NaoUserPermissionsGuard]
    },
    {
        path: 'login',
        component: PageLoginComponent,
        // canActivate: [AuthGuard],
        // data: {
        //     authGuardMode: 'redirectToDashboard',
        // },
    },
    {
        path: 'register',
        component: PageRegisterComponent,
        // canActivate: [AuthGuard],
        // data: {
        //     authGuardMode: 'redirectToDashboard',
        // },
    },
    // todo: uncomment this when we have the API ready for forgot password
    // {
    //     path: 'forgot-password',
    //     component: PageForgotPasswordComponent,
    //     // canActivate: [AuthGuard],
    //     // data: {
    //     //     authGuardMode: 'redirectToDashboard',
    //     // },
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule { }
