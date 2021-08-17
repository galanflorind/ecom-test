import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../shared/shared.module';
import { HomePartsModule } from './_parts/home.parts-module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        HomeRoutingModule,
        HomePartsModule,
        SharedModule
    ]
})
export class HomeModule { }
