import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { Product, Variant } from '../shared/interfaces/product';
import { map, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { CompareItem } from '../shared/interfaces/compare';

@Injectable({
    providedIn: 'root',
})
export class CompareService implements OnDestroy {
    private dataItems: CompareItem[] = [];

    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<CompareItem[]> = new BehaviorSubject<
        CompareItem[]
    >([]);

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
     * Adds product and variant to compare
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
            // -->Feed/Emit: product was added
            this.onAddingSubject$.next(product);

            this.dataItems.push({ product: product, variant: variant });
            this.save();
        } else {
            // -->Feed/Emit: product was already added previously
            this.onAddedSubject$.next(product);
        }

        // -->Complete
        return EMPTY;
    }

    /**
     * Removes compare item
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
            this.save();
        }

        // -->Complete
        return EMPTY;
    }

    /**
     * Reset: compare
     */
    public clear(): Observable<void> {
        // -->Clear: compare items
        this.dataItems = [];
        this.save();

        // -->Complete
        return EMPTY;
    }

    private save(): void {
        localStorage.setItem('compareItems', JSON.stringify(this.dataItems));

        this.itemsSubject$.next(this.dataItems);
    }

    private load(): void {
        const items = localStorage.getItem('compareItems');

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
