import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CompareService } from '../../services/compare.service';
import { CompareItem } from '../../interfaces/compare';

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
    ) { }

    /**
     * Remove: item from compare
     */
    public remove(compareItem: CompareItem): void {
        // -->Check: item and if remove action is already in progress
        if (!compareItem || this.inProgress) {
            return;
        }

        // -->Mark: remove action as in progress
        this.inProgress = true;

        // -->Remove: item from compare
        this.compare.remove(compareItem).pipe(takeUntil(this.destroy$)).subscribe({
            complete: () => {
                // -->Mark: remove action as completed
                this.inProgress = false;
                // -->Mark: as changed
                this.cd.markForCheck();
            },
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
