import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { Product, Variant } from '../../../interfaces/product';
import { CompareService } from '../../../services/compare.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appAddToCompare]',
    exportAs: 'addToCompare',
})
export class AddToCompareDirective implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public inProgress = false;

    constructor(
        private compare: CompareService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    add(product: Product, variant: Variant): void {
        if (!product || !variant || this.inProgress) {
            return;
        }

        this.inProgress = true;

        // -->Add: product variant to compare
        this.compare
            .add(product, variant)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                complete: () => {
                    this.inProgress = false;
                    this.cd.markForCheck();
                },
            });
    }
}
