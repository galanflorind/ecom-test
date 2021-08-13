import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
// modules
import { SharedModule } from '../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';

// pages
import { PageAboutUsComponent } from './page-about-us/page-about-us.component';
import { PageComponentsComponent } from './page-components/page-components.component';
import { PageContactUsOneComponent } from './page-contact-us-one/page-contact-us-one.component';
import { PageContactUsTwoComponent } from './page-contact-us-two/page-contact-us-two.component';
import { PageFaqComponent } from './page-faq/page-faq.component';
import { PageTermsComponent } from './page-terms/page-terms.component';
import { PageTypographyComponent } from './page-typography/page-typography.component';

// blocks
import { BlockMapComponent } from './block-map/block-map.component';
import { BlockReviewsComponent } from './block-reviews/block-reviews.component';
import { BlockTeammatesComponent } from './block-teammates/block-teammates.component';


@NgModule({
    declarations: [
        // pages
        PageAboutUsComponent,
        PageComponentsComponent,
        PageContactUsOneComponent,
        PageContactUsTwoComponent,
        PageFaqComponent,
        PageTermsComponent,
        PageTypographyComponent,
        // blocks
        BlockMapComponent,
        BlockReviewsComponent,
        BlockTeammatesComponent,
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
