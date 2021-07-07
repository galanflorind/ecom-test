import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NaoUserAccessService} from "@naologic/nao-user-access";
import {NaoHttp2ApiService} from "@naologic/nao-http2";
import {NaoDocumentInterface} from "@naologic/nao-interfaces";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService<T = any> {
    public readonly api = { root: 'users-guests/guest-profile' };
    public readonly userAccessOptions;

    constructor(
        private readonly naoHttp2ApiService: NaoHttp2ApiService,
        private naoUsersService: NaoUserAccessService
    ) {
        this.userAccessOptions = this.naoUsersService.userAccessOptions;
    }

    /**
     * Get user info
     */
    public getInfo(naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.root}/get/${naoQueryOptions.docName}/data`, {
            data: { naoQueryOptions: this.userAccessOptions.naoQueryOptions, cfpPath: this.userAccessOptions.cfpPath }, naoQueryOptions
        });
    }

    /**
     * Update user data
     *    @example
     *      this.update('data', { addresses: [] })
     */
    public update(mode: 'data'|'payment'|'order'|'password', data: Partial<T>, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        // -->Request: data browse
        return this.naoHttp2ApiService.postJson<T>(`${this.api.root}/update/${naoQueryOptions.docName}/data`, {
            data: { data, mode, naoQueryOptions: this.userAccessOptions.naoQueryOptions, cfpPath: this.userAccessOptions.cfpPath }, naoQueryOptions });
    }

    /**
     * Update user password
     */
    public updatePassword(currentPassword: string, newPassword: string, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        // -->Request: data browse
        return this.naoHttp2ApiService.patchJson<T>(`${this.api.root}/password/update/id`, { data: { currentPassword, newPassword }, naoQueryOptions });
    }

    /**
     * Delete my user account
     */
    public deleteAccount(password: string, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<any> {
        return this.naoHttp2ApiService.postJson(`${this.api.root}/delete/document/account`, { data: { password }, naoQueryOptions });
    }

    /**
     * List invoices
     */

    // ------------------------------------- \\
    /**
     * Send the email for password reset
     */
    public sendResetPasswordEmail(email: string): Observable<T> {
      // -->Check: this invite
      return this.naoHttp2ApiService.postJson<T>(`users-auth-sso/password/forgot/now`, { data: { email }, naoQueryOptions: this.naoUsersService.userAccessOptions.naoQueryOptions });
    }
    //
    // /**
    //  * Check the token for password reset
    //  */
    // public checkPasswordResetToken(token: string): Observable<T> {
    //   // -->Check: this invite
    //   return this.naoHttp2ApiService.postJson<T>(`users-auth-sso/password/forgot/check`, { data: { token }, naoQueryOptions: this.naoUsersService.userOptions.naoQueryOptions });
    // }
    //
    // /**
    //  * Reset the password and set the new one
    //  */
    // public resetPassword(token: string, password: string, confirmPassword: string): Observable<T> {
    //   // -->Check: this invite
    //   return this.naoHttp2ApiService.postJson<T>(`users-auth-sso/password/forgot/reset`, { data: { token, password, confirmPassword }, naoQueryOptions: this.naoUsersService.userOptions.naoQueryOptions });
    // }
}
