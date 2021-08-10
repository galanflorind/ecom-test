import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Product } from '../interfaces/product';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class QuickviewService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private abortPrevious$: Subject<void> = new Subject<void>();
    private showSubject$: Subject<Product> = new Subject();

    show$: Observable<Product> = this.showSubject$.pipe(
        takeUntil(this.destroy$)
    );

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    show(product: Product): Observable<void> {
        this.abortPrevious$.next();

        return of(this.showSubject$.next(product)).pipe(
            map(() => {}),
            takeUntil(this.abortPrevious$)
        );
    }
}
