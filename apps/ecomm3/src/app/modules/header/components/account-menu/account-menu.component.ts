import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NaoUserAccessService } from "@naologic/nao-user-access";

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    private subs = new Subscription();
    public userData = null;
    public formGroup!: FormGroup;
    public loginInProgress = false;

    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.account-menu') classAccountMenu = true;

    constructor(
        private fb: FormBuilder,
        public account: AccountApi,
        public router: Router,
        private naoUsersService: NaoUserAccessService,
    ) {
    }

    public ngOnInit(): void {
        this.subs.add(
            this.naoUsersService.userData.subscribe(userData => {
                // -->Set: user data
                this.userData = userData;
            })
        );

        this.formGroup = this.fb.group({
            email: ['contact@naologic.com', [Validators.required, Validators.email]],
            password: ['123456', [Validators.required]],
        });
    }


    /**
     * Login
     */
    public login(): void {
        this.formGroup.markAllAsTouched();

        if (this.loginInProgress || this.formGroup.invalid) {
            return;
        }

        // -->Get: formGroup data
        const fd = this.formGroup.getRawValue();

        this.loginInProgress = true;
        // -->Execute: a login
        this.naoUsersService
            .loginWithEmail(fd.email, fd.password, true)
            .then((res) => {
                console.log("res >>>", res)
                this.loginInProgress = false;
                this.closeMenu.emit();
                // -->Redirect
                return this.router.navigate(['/', 'account', 'dashboard']);
            })
            .catch((err) => {
                this.loginInProgress = false;
                // todo: show toaster with error
                // todo: show toaster with error
                // todo: show toaster with error
                this.formGroup.reset();
            });
    }

    /**
     * Logout
     */
    public logout(): void {
        this.naoUsersService.logout().then(() => {
            this.closeMenu.emit();
            this.router.navigateByUrl('/account/login').then();
        });
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
