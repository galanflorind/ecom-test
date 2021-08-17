import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountRoutingModule } from './account.routing.module';
import { AccountPartsModule } from './_parts/account.parts-module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        TranslateModule.forChild(),
        AccountPartsModule,
        SharedModule
    ]
})
export class AccountModule { }
