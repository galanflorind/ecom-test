import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
    providedIn: 'root',
})
export class WishlistService implements OnDestroy {
    private dataItems: Product[] = [];
    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    private onAddingSubject$: Subject<Product> = new Subject();

    public readonly items$: Observable<Product[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    public readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));
    public readonly onAdding$: Observable<Product> = this.onAddingSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            // -->Load: wishlist items
            this.load();
        }
    }

    /**
     * Add: product to wishlist
     */
    public add(product: Product): Observable<void> {
        this.onAddingSubject$.next(product);

        // -->Check: if product is already on the wishlist
        const index = this.dataItems.findIndex(item => item._id === product._id);

        // -->Add: product to wishlist
        if (index === -1) {
            this.dataItems.push(product);
            this.save();
        }

        // -->Complete
        return EMPTY;
    }

    /**
     * Remove: product from wishlist
     */
    public remove(product: Product): Observable<void> {
        // -->Check: if product is on the wishlist
        const index = this.dataItems.findIndex(item => item._id === product._id);

        // -->Remove: product and save
        if (index !== -1) {
            this.dataItems.splice(index, 1);
            this.save();
        }

        // -->Complete
        return EMPTY;
    }

    /**
     * Save: wishlist items to local storage
     */
    private save(): void {
        localStorage.setItem('wishlistItems', JSON.stringify(this.dataItems));

        // -->Emit: items
        this.itemsSubject$.next(this.dataItems);
    }

    /**
     * Load: wishlist items from local storage
     */
    private load(): void {
        const items = localStorage.getItem('wishlistItems');

        // -->Check: items
        if (items) {
            // -->Parse: and set wishlist items
            this.dataItems = JSON.parse(items);
            // -->Emit: items
            this.itemsSubject$.next(this.dataItems);
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
