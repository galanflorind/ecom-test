import { CompareItem } from './../../../interfaces/compare';
import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompareService } from '../../../services/compare.service';

@Directive({
    selector: '[appRemoveFromCompare]',
    exportAs: 'removeFromCompare',
})
export class RemoveFromCompareDirective implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public inProgress = false;

    constructor(
        private compare: CompareService,
        private cd: ChangeDetectorRef
    ) {}

    /**
     * Removes item from compare
     */
    public remove(compareItem: CompareItem): void {
        if (!compareItem || this.inProgress) {
            return;
        }

        this.inProgress = true;

        // -->Remove: item from compare
        this.compare
            .remove(compareItem)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                complete: () => {
                    this.inProgress = false;
                    this.cd.markForCheck();
                },
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
