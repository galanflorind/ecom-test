import {
    Component,
    ElementRef,
    Inject,
    Input, NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { fromOutsideClick } from '../../../shared/functions/rxjs/from-outside-click';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export type IndicatorTrigger = 'click' | 'hover';

@Component({
    selector: 'app-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.scss'],
    exportAs: 'indicator',
})
export class IndicatorComponent implements OnChanges, OnInit, OnDestroy {
    @Input() link!: string;
    @Input() icon!: string;
    @Input() label: string = '';
    @Input() value: string = '';
    @Input() counter?: string|number;
    @Input() trigger: IndicatorTrigger = 'hover';

    private destroy$: Subject<void> = new Subject<void>();

    public href: string = '';
    public classIndicatorOpen: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private zone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
        private elementRef: ElementRef<HTMLElement>,
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('link' in changes) {
            this.href = this.router.createUrlTree([this.link], { relativeTo: this.route }).toString();
        }
    }

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.zone.runOutsideAngular(() => {
            fromOutsideClick(this.elementRef.nativeElement).pipe(
                filter(() => this.classIndicatorOpen),
                takeUntil(this.destroy$),
            ).subscribe(() => {
                this.zone.run(() => this.classIndicatorOpen = false);
            });
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onClick(event: MouseEvent) {
        if (!event.cancelable) {
            return;
        }

        event.preventDefault();

        if (this.trigger !== 'click') {
            this.router.navigate([this.link], { relativeTo: this.route }).then();
        }

        this.classIndicatorOpen = !this.classIndicatorOpen;
    }

    public close(): void {
        this.classIndicatorOpen = false;
    }
}
