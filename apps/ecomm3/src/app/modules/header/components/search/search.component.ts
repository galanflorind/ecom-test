import {
    AfterViewInit,
    Component,
    ElementRef, HostBinding,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShopApi } from '../../../../api';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Product } from '../../../../interfaces/product';
import { ShopCategory } from '../../../../interfaces/category';
import { UrlService } from '../../../../services/url.service';
import { isPlatformBrowser } from '@angular/common';
import { fromOutsideClick } from '../../../../functions/rxjs/from-outside-click';
import { TranslateService } from '@ngx-translate/core';
import { NaoSettingsInterface } from "@naologic/nao-interfaces";
import {AppService} from "../../../../app.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
    private destroy$: Subject<void> = new Subject<void>();
    public appSettings: NaoSettingsInterface.Settings;

    query$: Subject<string> = new Subject<string>();

    suggestionsIsOpen = false;

    hasSuggestions = false;

    searchPlaceholder$!: Observable<string>;


    products: Product[] = [];

    categories: ShopCategory[] = [];

    @HostBinding('class.search') classSearch = true;

    get element(): HTMLElement { return this.elementRef.nativeElement; }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private zone: NgZone,
        private shopApi: ShopApi,
        private translate: TranslateService,
        private elementRef: ElementRef,
        public url: UrlService,
        private appService: AppService,
    ) { }

    ngOnInit(): void {
        // -->Set: app settings
        this.appSettings = this.appService.settings.getValue();

        this.query$.pipe(
            distinctUntilChanged(),
            switchMap(query => this.shopApi.getSearchSuggestions(query, {
                limitProducts: 3,
                limitCategories: 4,
            })),
            takeUntil(this.destroy$),
        ).subscribe(result => {
            if (result.products.length === 0 && result.categories.length === 0) {
                this.hasSuggestions = false;
                return;
            }

            this.hasSuggestions = true;
            this.products = result.products;
            this.categories = result.categories;
        });

        this.searchPlaceholder$ = this.translate.stream('INPUT_SEARCH_PLACEHOLDER')
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.zone.runOutsideAngular(() => {
            // fromOutsideClick([
            //     this.selectVehicleButton.nativeElement,
            //     this.vehiclePickerDropdown.nativeElement,
            // ]).pipe(
            //     filter(() => this.vehiclePickerIsOpen),
            //     takeUntil(this.destroy$),
            // ).subscribe(() => {
            //     this.zone.run(() => this.vehiclePickerIsOpen = false);
            // });

            fromOutsideClick(this.element).pipe(
                filter(() => this.suggestionsIsOpen),
                takeUntil(this.destroy$),
            ).subscribe(() => {
                this.zone.run(() => this.toggleSuggestions(false));
            });

            fromEvent(this.element, 'focusout').pipe(
                debounceTime(10),
                takeUntil(this.destroy$),
            ).subscribe(() => {
                if (document.activeElement === document.body) {
                    return;
                }

                // Close suggestions if the focus received an external element.
                if (document.activeElement && document.activeElement.closest('.search') !== this.element) {
                    this.zone.run(() => this.toggleSuggestions(false));
                }
            });
        });
    }

    search(query: string): void {
        this.query$.next(query);
    }

    toggleSuggestions(force?: boolean): void {
        this.suggestionsIsOpen = force !== undefined ? force : !this.suggestionsIsOpen;
    }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;

        this.search(input.value);
    }

    onInputFocus(event: FocusEvent): void {
        const input = event.target as HTMLInputElement;

        this.toggleSuggestions(true);
        this.search(input.value);
    }
}
