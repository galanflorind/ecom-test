import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountRoutingModule } from './account.routing.module';
import { AccountPartsModule } from './_parts/account.parts-module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        AccountRoutingModule,
        TranslateModule.forChild(),
        AccountPartsModule,
    ]
})
export class AccountModule { }
