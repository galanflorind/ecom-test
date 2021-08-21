import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account.routing';
import { AccountPartsModule } from './_parts/account.parts-module';
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        AccountRoutingModule,
        AccountPartsModule,
        SharedModule
    ]
})
export class AccountModule { }
