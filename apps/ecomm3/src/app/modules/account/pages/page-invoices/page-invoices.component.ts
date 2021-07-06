import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrdersList } from '../../../../interfaces/list';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../../services/url.service';
import { ECommerceService } from "../../../../e-commerce.service";
import { QuickMongoQuery } from "@naologic/nao-utils";

@Component({
    selector: 'app-page-orders',
    templateUrl: './page-invoices.component.html',
    styleUrls: ['./page-invoices.component.scss'],
})
export class PageInvoicesComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public currentPage: FormControl = new FormControl(1);
    public list!: OrdersList;
    public perPage = 1;

    constructor(
        public url: UrlService,
        public eCommerceService: ECommerceService,
    ) { }

    public ngOnInit(): void {
        // -->Refresh
        this.refresh();
        // -->Subscribe: to value changes
        this.currentPage.valueChanges.subscribe(page => {
            this.refresh();
        })
    }


    /**
     * Refresh
     */
    public refresh(): void {
        // todo: add loading
        // todo: add loading
        // todo: add loading
        // todo: add loading
        // -->Create: query
        const query = new QuickMongoQuery()
            .limit(this.perPage)
            .skip((this.currentPage.value - 1) * this.perPage)
            .returnDataModel({ _id: 1, data: 1 })
            .done();
        // -->Execute
        this.eCommerceService.listInvoices(query).subscribe(res => {
            console.log("res >>>")
            if (res && Array.isArray(res.data)) {
                this.list = res.data
            }
        }, err => {
            console.log("err")
        })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
