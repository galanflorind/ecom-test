import { AccountRoutingModule } from './account.routing.module';
import { NgModule } from '@angular/core';
import { AccountPartsModule } from './_parts/account.parts-module';
import { LayoutComponent } from './layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        AccountRoutingModule,
        TranslateModule.forChild(),
        AccountPartsModule,
    ],
})
export class AccountModule { }
