import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRouting } from './home.routing';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        HomeRouting,
        SharedModule
    ],
})
export class HomeModule { }
