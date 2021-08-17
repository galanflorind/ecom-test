import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';
import { map, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

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
            this.load();
        }
    }

    /**
     * Adds product to wishlist
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
     * Removes product from wishlist
     */
    public remove(product: Product): Observable<void> {
        // -->Check: if product is on the wishlist
        const index = this.dataItems.findIndex(item => item._id === product._id);

        // -->Remove: product and save
        if (index !== -1) {
            this.dataItems.splice(index, 1);
            this.save();
        }

        return EMPTY;
    }

    private save(): void {
        localStorage.setItem('wishlistItems', JSON.stringify(this.dataItems));

        this.itemsSubject$.next(this.dataItems);
    }

    private load(): void {
        const items = localStorage.getItem('wishlistItems');

        if (items) {
            this.dataItems = JSON.parse(items);
            this.itemsSubject$.next(this.dataItems);
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
