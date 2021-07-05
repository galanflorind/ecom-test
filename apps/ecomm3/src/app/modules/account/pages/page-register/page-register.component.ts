import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { mustMatchValidator } from '../../../../functions/validators/must-match';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.scss'],
})
export class PageRegisterComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public registerForm!: FormGroup;
    public registerInProgress = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private account: AccountApi,
    ) { }

    public ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        }, { validators: [mustMatchValidator('password', 'confirmPassword')] });
    }


    public register(): void {
        this.registerForm.markAllAsTouched();

        if (this.registerInProgress || this.registerForm.invalid) {
            return;
        }

        this.registerInProgress = true;

        this.account.signUp(
            this.registerForm.value.email,
            this.registerForm.value.password,
        ).pipe(
            finalize(() => this.registerInProgress = false),
            takeUntil(this.destroy$),
        ).subscribe(
            () => this.router.navigateByUrl('/account/dashboard'),
            error => {
                if (error instanceof HttpErrorResponse) {
                    this.registerForm.setErrors({
                        server: `ERROR_API_${error.error.message}`,
                    });
                } else {
                    alert(error);
                }
            },
        );
    }


    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
