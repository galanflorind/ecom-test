import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../interfaces/product';

@Directive({
    selector: '[appRemoveFromWishlist]',
    exportAs: 'removeFromWishlist',
})
export class RemoveFromWishlistDirective implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public inProgress = false;

    constructor(
        private wishlist: WishlistService,
        private cd: ChangeDetectorRef,
    ) { }

    public remove(product: Product): void {
        // -->Check: if remove action is already in progress
        if (this.inProgress) {
            return;
        }

        // -->Mark: remove actions as in progress
        this.inProgress = true;
        // -->Remove: product from wishlist
        this.wishlist.remove(product).pipe(takeUntil(this.destroy$)).subscribe({
            complete: () => {
                // -->Mark: remove actions as completed
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
