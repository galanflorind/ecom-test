import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {NaoUserAccessService} from "../../../../../../../../libs/nao-user-access/src";

@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public loginForm!: FormGroup;
    public loginInProgress = false;


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private naoUsersService: NaoUserAccessService,
    ) { }

    public ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['contact@naologic.com', [Validators.required, Validators.email]],
            password: ['123456', [Validators.required]],
            rememberMe: [false],
        });
    }

    public login(): void {
        this.loginForm.markAllAsTouched();

        if (this.loginInProgress || this.loginForm.invalid) {
            return;
        }
        // -->Get: formGroup data
        const fd = this.loginForm.getRawValue();

        this.loginInProgress = true;
        // -->Execute: a login
        this.naoUsersService
            .loginWithEmail(fd.email, fd.password, fd.rememberMe)
            .then((ok) => {
                return this.router.navigateByUrl('/account/dashboard');
            })
            .catch((err) => {
                // todo: show toaster with error
                this.loginForm.reset();
            });

        // this.account.signIn(
        //     this.loginForm.value.email,
        //     this.loginForm.value.password,
        // ).pipe(
        //     finalize(() => this.loginInProgress = false),
        //     takeUntil(this.destroy$),
        // ).subscribe(
        //     () => this.router.navigateByUrl('/account/dashboard'),
        //     error => {
        //         if (error instanceof HttpErrorResponse) {
        //             this.loginForm.setErrors({
        //                 server: `ERROR_API_${error.error.message}`,
        //             });
        //         } else {
        //             alert(error);
        //         }
        //     },
        // );
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
