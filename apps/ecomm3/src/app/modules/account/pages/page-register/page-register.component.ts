import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { mustMatchValidator } from '../../../../functions/validators/must-match';
import { NaoUserAccessService } from "@naologic/nao-user-access";
import { NaoUsersAuthService } from "../../../../services/nao-users-auth.service";

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.scss'],
})
export class PageRegisterComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public formGroup!: FormGroup;
    public registerInProgress = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private naoUsersService: NaoUserAccessService,
        private naoUsersAuthService: NaoUsersAuthService,
    ) { }

    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        }, { validators: [mustMatchValidator('password', 'confirmPassword')] });
    }


    public register(): void {
        this.formGroup.markAllAsTouched();

        if (this.registerInProgress || this.formGroup.invalid) {
            return;
        }

        // -->Get: data
        const data = this.formGroup.getRawValue();
        // -->Delete: fields taht we don't need
        delete data.confirm_password;
        delete data.company;

        this.registerInProgress = true;

        // -->Update: doc
        this.naoUsersAuthService.createUser(data).subscribe(
            (ok) => {
                // -->Execute: a login
                this.naoUsersService
                    .loginWithEmail(data.email, data.password, data.rememberMe)
                    .then((ok2) => {
                        this.registerInProgress = false
                        // -->Redirect
                        return this.router.navigate(['/', 'account', 'dashboard']);
                    })
                    .catch((err) => {
                        // this.status.error();
                        this.formGroup.reset();
                    });
                // this.status.done();
                // this.formGroup.enableDelay(800);
                // this.formGroup.markAllAsPristine();
            },
            (err) => {
                this.registerInProgress = false
                // this.formGroup.enableDelay(800);
                // this.formGroup.markAllAsPristine();
                this.formGroup.enable();
            }
        );

        // this.account.signUp(
        //     this.formGroup.value.email,
        //     this.formGroup.value.password,
        // ).pipe(
        //     finalize(() => this.registerInProgress = false),
        //     takeUntil(this.destroy$),
        // ).subscribe(
        //     () => this.router.navigateByUrl('/account/dashboard'),
        //     error => {
        //         if (error instanceof HttpErrorResponse) {
        //             this.formGroup.setErrors({
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
