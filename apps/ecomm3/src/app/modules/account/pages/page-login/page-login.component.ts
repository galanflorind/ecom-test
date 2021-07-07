import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NaoUserAccessService } from "@naologic/nao-user-access";

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
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
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
            .then((res) => {
                console.log("res >>>", res)
                this.loginInProgress = false;
                // -->Redirect
                return this.router.navigate(['/', 'account', 'dashboard']);
            })
            .catch((err) => {
                this.loginInProgress = false;
                // todo: show toaster with error
                // todo: show toaster with error
                // todo: show toaster with error
                this.loginForm.reset();
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
