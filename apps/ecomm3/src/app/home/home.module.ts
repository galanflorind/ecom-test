import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        HomeRoutingModule,
        SharedModule
    ],
})
export class HomeModule { }
