import { Injectable } from '@angular/core';
import { NgxPermissionsGuard, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NaoUserAccessService } from './nao-user-access.service';

/**
 * Overlay service for nao permissions
 */
@Injectable({
  providedIn: 'root'
})
export class NaoUserPermissionsGuard extends NgxPermissionsGuard implements CanActivate, CanLoad, CanActivateChild {
  private readonly router$: Router;

  constructor(
    permissionsService: NgxPermissionsService,
    rolesService: NgxRolesService,
    router: Router,
    private readonly naoUserAccessService: NaoUserAccessService
  ) {
    super(permissionsService, rolesService, router);
    this.router$ = router;
  }

  /**
   * Check if the route can be activated
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    // -->Check: if user is logged in
    const res = this.naoUserAccessService.checkUserAndRedirect();
    if (res.canLoad) {
      return super.canActivate(route, state);
    } else {
      // -->Redirect: to login
      return this.router$.navigateByUrl(res.redirectTo);
    }
  }

  /**
   * Check if a child route can be activated with the current user logged in
   */
  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // -->Check: if user is logged in
    const res = this.naoUserAccessService.checkUserAndRedirect();
    if (res.canLoad) {
      return super.canActivateChild(childRoute, state);
    } else {
      // -->Redirect: to login
      return this.router$.navigateByUrl(res.redirectTo);
    }
  }

  /**
   * Check if a module can be loaded with the current user logged in
   */
  public canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    // -->Check: if user is logged in
    const res = this.naoUserAccessService.checkUserAndRedirect();
    if (res.canLoad) {
      return super.canLoad(route);
    } else {
      // -->Redirect: to login
      return this.router$.navigateByUrl(res.redirectTo);
    }
  }
}
