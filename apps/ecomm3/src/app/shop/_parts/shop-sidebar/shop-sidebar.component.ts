import { Component, HostBinding, Inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ShopSidebarService } from '../../shop-sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { fromMatchMedia } from '../../../shared/functions/rxjs/from-match-media';

@Component({
    selector: 'app-shop-sidebar',
    templateUrl: './shop-sidebar.component.html',
    styleUrls: ['./shop-sidebar.component.scss'],
})
export class ShopSidebarComponent implements OnDestroy {
    @Input() offcanvas: 'always' | 'mobile' = 'always';

    private destroy$: Subject<void> = new Subject<void>();

    // latestProducts$: Observable<Product[]> = of([]);

    @HostBinding('class.sidebar') classSidebar = true;

    @HostBinding('class.sidebar--offcanvas--always') get classSidebarOffcanvasAlways(): boolean { return this.offcanvas === 'always'; }

    @HostBinding('class.sidebar--offcanvas--mobile') get classSidebarOffcanvasMobile(): boolean { return this.offcanvas === 'mobile'; }

    @HostBinding('class.sidebar--open') get classSidebarOpen(): boolean {
        return this.sidebar.isOpen;
    }

    constructor(
        // private shop: ShopApi,
        public sidebar: ShopSidebarService,
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.sidebar.isOpen$
            .pipe(takeUntil(this.destroy$))
            .subscribe((isOpen) => {
                if (isOpen) {
                    this.open();
                } else {
                    this.close();
                }
            });

        if (isPlatformBrowser(this.platformId)) {
            fromMatchMedia('(max-width: 991px)').pipe(takeUntil(this.destroy$)).subscribe(media => {
                if (this.offcanvas === 'mobile' && this.sidebar.isOpen && !media.matches) {
                    this.sidebar.close();
                }
            });
        }
    }

    // public ngOnInit(): void {
    //     this.latestProducts$ = this.shop.getLatestProducts(5);
    // }

    private open(): void {
        if (isPlatformBrowser(this.platformId)) {
            const bodyWidth = this.document.body.offsetWidth;

            this.document.body.style.overflow = 'hidden';
            this.document.body.style.paddingRight = (this.document.body.offsetWidth - bodyWidth) + 'px';
        }
    }

    private close(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.document.body.style.overflow = '';
            this.document.body.style.paddingRight = '';
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
