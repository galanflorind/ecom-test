import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { BlocksModule } from '../shared/_parts/blocks/blocks.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        HomeRoutingModule,
        BlocksModule,
        SharedModule,
    ],
})
export class HomeModule { }
