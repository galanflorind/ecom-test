import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountApi } from '../../../../api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from '../../../../interfaces/address';
import { UrlService } from '../../../../services/url.service';
import { Order } from '../../../../interfaces/order';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.scss'],
})
export class PageDashboardComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public address!: Address;
    public orders: Order[] = [];

    constructor(
        public account: AccountApi,
        public url: UrlService,
    ) { }

    public ngOnInit(): void {
        this.account.getDefaultAddress().pipe(takeUntil(this.destroy$)).subscribe(x => this.address = x);
        this.account.getOrdersList({ limit: 3 }).pipe(takeUntil(this.destroy$)).subscribe(x => this.orders = x.items);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
