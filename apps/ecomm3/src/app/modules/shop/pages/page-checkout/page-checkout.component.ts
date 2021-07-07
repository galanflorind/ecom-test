import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TermsModalComponent } from '../../../shared/components/terms-modal/terms-modal.component';
import { CartService } from '../../../../services/cart.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountApi, CheckoutData } from '../../../../api';
import { UrlService } from '../../../../services/url.service';
import { NaoUserAccessService, NaoUsersInterface } from "@naologic/nao-user-access";
import { ECommerceService } from "../../../../e-commerce.service";
import { AppService } from "../../../../app.service";

@Component({
    selector: 'app-page-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss'],
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    private subs = new Subscription();
    public formGroup: FormGroup;
    public checkoutInProgress = false;
    public addresses: NaoUsersInterface.Address[] = [];
    public shippingMethods: any[] = []
    public payments = [
        {
            name: 'bank',
            label: 'TEXT_PAYMENT_BANK_LABEL',
            description: 'TEXT_PAYMENT_BANK_DESCRIPTION',
        },
        {
            name: 'check',
            label: 'TEXT_PAYMENT_CHECK_LABEL',
            description: 'TEXT_PAYMENT_CHECK_DESCRIPTION',
        },
        {
            name: 'cash',
            label: 'TEXT_PAYMENT_CASH_LABEL',
            description: 'TEXT_PAYMENT_CASH_DESCRIPTION',
        }
    ];



    constructor(
        private fb: FormBuilder,
        private modalService: BsModalService,
        private router: Router,
        private translate: TranslateService,
        public url: UrlService,
        public accountApi: AccountApi,
        public eCommerceService: ECommerceService,
        public cart: CartService,
        public appService: AppService,
        private naoUsersService: NaoUserAccessService
    ) {
        this.formGroup = new FormGroup({
            billingAddressId: new FormControl(null, {validators: [Validators.required]}),
            shippingAddressId: new FormControl(null, {validators: [Validators.required]}),
            shippingMethod: new FormControl(null, {validators: [Validators.required]}),
            agree: new FormControl(false, {validators: [Validators.requiredTrue]}),
        });

    }

    public ngOnInit(): void {
        // -->Set: addresses
        this.addresses = this.naoUsersService.linkedDoc.getValue()?.data?.addresses || [];
        // -->Set: info
        const appInfo = this.appService.appInfo.getValue();
        // -->Set: shipping methods
        this.shippingMethods = appInfo?.shippingMethods || [];

        // -->Set: billingAddressId default
        this.formGroup.get('billingAddressId').patchValue(this.addresses.length ? this.addresses[0].id: null);
        // -->Set: billingAddressId default
        this.formGroup.get('shippingAddressId').patchValue(this.addresses.length ? this.addresses[0].id: null);
        // -->Set: shippingMethod default
        this.formGroup.get('shippingMethod').patchValue(this.shippingMethods.length ? this.shippingMethods[0].id: null);

        this.cart.quantity$.pipe(
            filter(x => x === 0),
            takeUntil(this.destroy$),
        ).subscribe(() => this.router.navigateByUrl('/shop/cart').then());

    }

    /**
     * open modal with terms
     */
    public showTerms(event: MouseEvent): void {
        event.preventDefault();

        this.modalService.show(TermsModalComponent, { class: 'modal-lg' });
    }

    public createOrder(): void {
        if (!this.checkData()) {
            return;
        }

        this.checkout();
    }

    private markAllAsTouched(): void {
        this.formGroup.markAllAsTouched();
    }

    private checkData(): boolean {
        this.markAllAsTouched();

        if (this.formGroup.invalid) {
            alert(this.translate.instant('ERROR_CHECKOUT'));
        }

        return this.formGroup.valid;
    }

    private checkout(): void {
        const value = this.formGroup.value;

        console.log("checkout >>>", value)
        // const checkoutData: CheckoutData = {
        //     payment: value.paymentMethod,
        //     items: this.cart.items.map(item => ({
        //         productId: item.product.id,
        //         variant: item.variant,
        //         quantity: item.quantity,
        //     })),
        //     billingAddress,
        //     shippingAddress,
        //     comment: value.comment,
        // };

        // this.checkout$.next(checkoutData);
    }


    public ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
