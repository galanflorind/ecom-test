import { CompareItem } from './../../../../interfaces/compare';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompareService } from '../../../../services/compare.service';
import { Observable, Subject } from 'rxjs';
// import { ProductAttributeValue } from '../../../../interfaces/product';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { FormControl } from '@angular/forms';
import { NaoSettingsInterface } from '@naologic/nao-interfaces';
import { AppService } from '../../../../app.service';

// interface Attribute {
//     slug: string;
//     name: string;
//     sameValues: boolean;
//     values: {[productId: number]: ProductAttributeValue[]};
// }

@Component({
    selector: 'app-page-compare',
    templateUrl: './page-compare.component.html',
    styleUrls: ['./page-compare.component.scss'],
})
export class PageCompareComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public appSettings: NaoSettingsInterface.Settings;
    public compareItems$: Observable<CompareItem[]>;
    // public attributes$: Observable<Attribute[]>;
    // public differentAttributes$: Observable<Attribute[]>;

    public show: FormControl = new FormControl('all');
    public clearInProgress = false;

    constructor(
        public compare: CompareService,
        public url: UrlService,
        private appService: AppService
    ) {
        this.compareItems$ = this.compare.items$.pipe(shareReplay(1)).pipe();

        // // Product attributes are noted as deprecated in Product definition

        // this.attributes$ = this.compareItems$.pipe(
        //     map(compareItems => {
        //         const attributes: Attribute[] = [];

        //         compareItems.forEach(({product}) => product.attributes.forEach(pa => {
        //             let attribute = attributes.find(x => x.slug === pa.slug);

        //             if (!attribute) {
        //                 attribute = {
        //                     slug: pa.slug,
        //                     name: pa.name,
        //                     sameValues: false,
        //                     values: {},
        //                 };

        //                 attributes.push(attribute);
        //             }

        //             attribute.values[product.id] = pa.values;
        //         }));

        //         attributes.forEach(attribute => {
        //             const values = compareItems.map(({ product }) => {
        //                 return (attribute.values[product.id] || [])
        //                     .map((x) => x.slug)
        //                     .sort();
        //             });

        //             attribute.sameValues = values.reduce<boolean>((sameValues, curr) => {
        //                 return sameValues && (values[0].length === curr.length && values[0].join() === curr.join());
        //             }, true);
        //         });

        //         return attributes;
        //     }),
        //     shareReplay(1),
        // );
        // this.differentAttributes$ = this.attributes$.pipe(
        //     map(attributes => attributes.filter(x => !x.sameValues)),
        //     shareReplay(1),
        // );
    }

    public ngOnInit(): void {
        // -->Set: app settings
        this.appSettings = this.appService.settings.getValue();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public clear(): void {
        if (this.clearInProgress) {
            return;
        }

        this.clearInProgress = true;
        this.compare
            .clear()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                complete: () => {
                    this.clearInProgress = false;
                },
            });
    }
}
