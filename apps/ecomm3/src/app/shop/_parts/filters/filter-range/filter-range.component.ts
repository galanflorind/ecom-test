import { Component, forwardRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { LanguageService } from '../../../../shared/language/services/language.service';
import { RangeFilter } from '../../../../interfaces/filter';

@Component({
    selector: 'app-filter-range',
    templateUrl: './filter-range.component.html',
    styleUrls: ['./filter-range.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterRangeComponent),
            multi: true,
        },
    ],
})
export class FilterRangeComponent implements OnInit, ControlValueAccessor {
    @Input() public options!: RangeFilter;

    private value!: [number, number];
    private debouncedValue: [number, number]|null = null;
    private changeFn: (_: [number, number]) => void = () => {};
    private touchedFn: () => void = () => {};

    public control!: FormControl;
    public isPlatformBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private language: LanguageService,
    ) { }

    public ngOnInit(): void {
        // -->Set: value from options
        this.value = [this.options.min, this.options.max];
        // -->Build: control
        this.control = new FormControl(this.value);

        // -->Subscribe: to control value changes
        this.control.valueChanges.pipe(
            filter(value => value[0] !== this.value[0] || value[1] !== this.value[1]),
            tap(value => this.debouncedValue = value),
            debounceTime(350),
        ).subscribe(value => {
            this.debouncedValue = null;
            // -->Handle: changes
            this.changeFn(value);
            this.touchedFn();
        });
    }

    /**
     * Register: callback function to handle value changes
     */
    public registerOnChange(fn: any): void {
        this.changeFn = fn;
    }

    /**
     * Register: callback function to handle control touch events
     */
    public registerOnTouched(fn: any): void {
        this.touchedFn = fn;
    }

    /**
     * Set: control disabled state
     */
    public setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.control.disable({ emitEvent: false });
        } else {
            this.control.enable({ emitEvent: false });
        }
    }

    /**
     * Set: control value
     */
    public writeValue(value: any): void {
        if (this.debouncedValue !== null) {
            return;
        }

        this.value = value;
        this.control.setValue(this.value, { emitEvent: false });
    }

    /**
     * Check: if language is right to left
     */
    public isRTL(): boolean {
        return this.language.isRTL();
    }
}
