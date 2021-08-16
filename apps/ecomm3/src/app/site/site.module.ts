import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
// modules
import { SharedModule } from '../shared/shared.module';
import { SiteRoutingModule } from './site.routing.module';

// pages
import { PageAboutUsComponent } from './page-about-us/page-about-us.component';
import { PageFaqComponent } from './page-faq/page-faq.component';
import { PageTermsComponent } from './page-terms/page-terms.component';


@NgModule({
    declarations: [
        // pages
        PageAboutUsComponent,
        PageFaqComponent,
        PageTermsComponent,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        CarouselModule,
        // modules
        SharedModule,
        SiteRoutingModule,
    ],
})
export class SiteModule { }
