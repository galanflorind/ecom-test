import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Product, Variant } from '../interfaces/product';
import { CompareItem } from '../interfaces/compare';

@Injectable({
    providedIn: 'root',
})
export class CompareService implements OnDestroy {
    private dataItems: CompareItem[] = [];
    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<CompareItem[]> = new BehaviorSubject<CompareItem[]>([]);
    private onAddingSubject$: Subject<Product> = new Subject();
    private onAddedSubject$: Subject<Product> = new Subject();

    public readonly items$: Observable<CompareItem[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    public readonly count$: Observable<number> = this.itemsSubject$.pipe(map((items) => items.length));
    public readonly onAdding$: Observable<Product> = this.onAddingSubject$.asObservable();
    public readonly onAdded$: Observable<Product> = this.onAddedSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
        }
    }

    /**
     * Add: product and variant to compare
     */
    public add(product: Product, variant: Variant): Observable<void> {
        // -->Check: product and variant
        if (!product || !variant) {
            return;
        }

        // -->Check: if this specific variant of the product was already pushed
        const index = this.dataItems.findIndex(
            item => item.product._id === product._id && item.variant.id === variant.id
        );

        // -->Add: compare item
        if (index === -1) {
            // -->Emit: product was added
            this.onAddingSubject$.next(product);

            // -->Add: compare item
            this.dataItems.push({ product: product, variant: variant });
            // -->Save
            this.save();
        } else {
            // -->Emit: product was already added previously
            this.onAddedSubject$.next(product);
        }

        // -->Complete
        return EMPTY;
    }

    /**
     * Remove: compare item
     */
    public remove(compareItem: CompareItem): Observable<void> {
        // -->Check: compare item
        if (!compareItem) {
            return;
        }

        // -->Check: if this specific variant of the product is registered
        const index = this.dataItems.findIndex(
            item => item.product._id === compareItem.product._id && item.variant.id === compareItem.variant.id
        );

        // -->Remove: compare item
        if (index !== -1) {
            this.dataItems.splice(index, 1);
            // -->Save
            this.save();
        }

        // -->Complete
        return EMPTY;
    }

    /**
     * Reset: compare items
     */
    public clear(): Observable<void> {
        // -->Clear: compare items
        this.dataItems = [];
        // -->Save
        this.save();

        // -->Complete
        return EMPTY;
    }

    /**
     * Save: compare items to local storage
     */
    private save(): void {
        // -->Save: items
        localStorage.setItem('compareItems', JSON.stringify(this.dataItems));

        // -->Emit: items
        this.itemsSubject$.next(this.dataItems);
    }

    /**
     * Load: compare items from local storage
     */
    private load(): void {
        // -->Load: compare items
        const items = localStorage.getItem('compareItems');

        // -->Check: items
        if (items) {
            // -->Parse: and set data items
            this.dataItems = JSON.parse(items);
            // -->Emit: data items
            this.itemsSubject$.next(this.dataItems);
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
