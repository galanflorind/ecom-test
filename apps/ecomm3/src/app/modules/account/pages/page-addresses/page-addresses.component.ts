import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountApi } from '../../../../api';
import {Subject, Subscription} from 'rxjs';
import { Address } from '../../../../interfaces/address';
import { finalize, mergeMap, takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import {NaoUserAccessService} from "../../../../../../../../libs/nao-user-access/src";

@Component({
    selector: 'app-page-addresses',
    templateUrl: './page-addresses.component.html',
    styleUrls: ['./page-addresses.component.scss'],
})
export class PageAddressesComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public addresses: Address[] = [];
    public removeInProgress: number[] = [];
    public subs = new Subscription();

    constructor(
        private naoUsersService: NaoUserAccessService,
        public url: UrlService,
    ) { }

    ngOnInit(): void {
        this.subs.add(
            this.naoUsersService.userData.subscribe(userData => {
                console.log("userdata >>>", userData)
                // -->Set: user data
                // this.addresses = userData.addrese;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }

    public remove(address: Address): void {
        // todo: when you remove an address, you need to save the whole address rows
        // if (this.removeInProgress.indexOf(address.id) !== -1) {
        //     return;
        // }
        //
        // this.removeInProgress.push(address.id);
        //
        // this.account.delAddress(address.id).pipe(
        //     mergeMap(() => this.account.getAddresses()),
        //     finalize(() => {
        //         const index = this.removeInProgress.indexOf(address.id);
        //
        //         if (index !== -1) {
        //             this.removeInProgress.splice(index, 1);
        //         }
        //     }),
        //     takeUntil(this.destroy$),
        // ).subscribe(addresses => this.addresses = addresses);
    }
}
