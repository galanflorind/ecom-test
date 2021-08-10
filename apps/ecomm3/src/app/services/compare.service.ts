import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { Product } from '../interfaces/product';
import { map, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class CompareService implements OnDestroy {
    private dataItems: Product[] = [];

    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    private onAddingSubject$: Subject<Product> = new Subject();

    readonly items$: Observable<Product[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));
    readonly onAdding$: Observable<Product> = this.onAddingSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
        }
    }

    add(product: Product): Observable<void> {
        this.onAddingSubject$.next(product);

        const index = this.dataItems.findIndex(
            (item) => item.id === product.id
        );

        if (index === -1) {
            this.dataItems.push(product);
            this.save();
        }

        return EMPTY;
    }

    remove(product: Product): Observable<void> {
        const index = this.dataItems.findIndex(
            (item) => item.id === product.id
        );

        if (index !== -1) {
            this.dataItems.splice(index, 1);
            this.save();
        }

        return EMPTY;
    }

    clear(): Observable<void> {
        this.dataItems = [];
        this.save();

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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
