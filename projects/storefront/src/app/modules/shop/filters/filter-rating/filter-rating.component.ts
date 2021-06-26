import { Component, forwardRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { RatingFilter, RatingFilterItem } from '../../../../interfaces/filter';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-filter-rating',
    templateUrl: './filter-rating.component.html',
    styleUrls: ['./filter-rating.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterRatingComponent),
            multi: true,
        },
    ],
})
export class FilterRatingComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private destroy$: Subject<void> = new Subject<void>();

    value: any[] = [];

    control: FormControl = new FormControl([]);

    @Input() options!: RatingFilter;

    @HostBinding('class.filter-rating') classFilterRating = true;

    changeFn: (_: number) => void = () => {};

    touchedFn: () => void = () => {};

    constructor() { }

    ngOnInit(): void {
        this.control.valueChanges.pipe(
            filter(value => value !== this.value),
            takeUntil(this.destroy$),
        ).subscribe(value => this.changeFn(value));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    registerOnChange(fn: any): void {
        this.changeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.touchedFn = fn;
    }

    writeValue(obj: any): void {
        this.control.setValue(this.value = obj, { emitEvent: false });
    }

    trackByRating(index: number, item: RatingFilterItem): number {
        return item.rating;
    }
}
