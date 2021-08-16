import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';
import { SiteRoutingModule } from './site.routing.module';
import { PageAboutUsComponent } from './page-about-us/page-about-us.component';
import { PageFaqComponent } from './page-faq/page-faq.component';
import { PageTermsComponent } from './page-terms/page-terms.component';


@NgModule({
    declarations: [
        PageAboutUsComponent,
        PageFaqComponent,
        PageTermsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CarouselModule,
        SharedModule,
        SiteRoutingModule,
    ],
})
export class SiteModule { }
