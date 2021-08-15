import { Component, OnDestroy, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { mustMatchValidator } from '../../../../functions/validators/must-match';
import { NaoUserAccessService } from "@naologic/nao-user-access";
import { NaoUsersAuthService } from "../../../../services/nao-users-auth.service";


/**
 * todo: move to utils
 * Check password strength
 *  > Checks if you have at least one lowercase character
 *                                one uppercase character
 *                                one number
 */
function checkPasswordStrength(options = { lowerCase: 1, upperCase: 1, numeric: 1 }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // -->Check:
        if (control.pristine || control.value === null) {
            return null;
        }

        // -->Test: string
        const lowercaseCount = control.value.match(/[a-z]/g)?.length ?? 0;
        const uppercaseCount = control.value.match(/[A-Z]/g)?.length ?? 0;
        const numericCount = control.value.match(/[0-9]/g)?.length ?? 0;

        // -->Check: if the options are meet
        if (lowercaseCount < options.lowerCase ||
            uppercaseCount < options.upperCase ||
            numericCount < options.numeric) {
            // -->Mark: as touched
            control.markAsTouched();
            // -->Return
            return { passwordNotStrongEnough: true }
        }

        return null;
    };
}


@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.scss'],
})
export class PageRegisterComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public formGroup!: FormGroup;
    public registerInProgress = false;
    public registerDone = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private naoUsersService: NaoUserAccessService,
        private naoUsersAuthService: NaoUsersAuthService,
    ) { }

    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(32), checkPasswordStrength()]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            companyName: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
        }, { validators: [mustMatchValidator('password', 'confirmPassword')] });
    }


    public register(): void {
        this.formGroup.markAllAsTouched();
        // -->Check
        if (this.registerInProgress || this.formGroup.invalid) {
            return;
        }

        // -->Get: data
        const data = this.formGroup.getRawValue();
        // -->Start: loading
        this.registerInProgress = true;
        // -->Update: doc
        this.naoUsersAuthService.createUser(data).subscribe(
            (ok) => {
                this.registerDone = true;
            },
            (err) => {
                this.registerInProgress = false
                this.formGroup.enable();
            }
        );
    }


    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
