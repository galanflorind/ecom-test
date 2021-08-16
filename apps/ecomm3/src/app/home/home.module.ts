import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HomePartsModule } from './_parts/home.parts-module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        HomeRoutingModule,
        SharedModule,
        HomePartsModule
    ],
})
export class HomeModule { }
