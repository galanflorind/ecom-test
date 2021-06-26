import { NaoLocalStorageClass, NaoStreamInterface } from '@naologic/nao-stream';
import { BehaviorSubject } from 'rxjs';
import { NaoCompanyInterface, NaoUserAccessInterface, NaoUsersInterface } from './nao-user-access.interface';
import { naoAccessToken$ } from '@naologic/nao-utils';
import { NgxPermissionsObject } from 'ngx-permissions';
import { difference, isPlainObject, values } from 'lodash';


const charCodes1 = [97, 115, 100, 97, 115, 100, 97, 115, 100, 97, 100, 50, 51, 52, 101, 102, 115, 102, 50, 51, 114, 115, 100];
const charCodes2 = [115, 100, 98, 97, 117, 121, 115, 100, 103, 121, 121, 50, 51, 114, 97, 100, 50, 51, 50, 51, 100, 102, 119, 101, 102];
const charCodes3 = [115, 100, 98, 97, 117, 121, 115, 100, 103, 121, 121, 50, 51, 114, 97, 100, 50, 51, 50, 51, 100, 102, 119, 101, 102];

export const NaoUserAccessData = {
  userStorage: new NaoLocalStorageClass('user', 'localStorage', { type: 'aes', pass: String.fromCharCode(...charCodes3) }),
  sessionStorage: new NaoLocalStorageClass('userData', 'sessionStorage', { type: 'aes', pass: String.fromCharCode(...charCodes3) }),
  accessTokens: String.fromCharCode(...charCodes1),
  sessionDataKey: String.fromCharCode(...charCodes2),
  isLoggedIn$: new BehaviorSubject<boolean>(false),
  locale: new BehaviorSubject<NaoUserAccessInterface.Locale>({ lang: 'en', currencyCode: 'USD', countryCode: 'USA' }),
  userId: new BehaviorSubject<string>(null),
  userData: new BehaviorSubject<NaoUsersInterface.UserData>(null),
  companyId: new BehaviorSubject<string>(null),
  companyData: new BehaviorSubject<NaoCompanyInterface.Company>(null),
  rolePermissions$: new BehaviorSubject<string[]>([]),
  roleData: new BehaviorSubject<NaoUsersInterface.Role>(null),
  ads: new BehaviorSubject<any>(null),
  oldRoleData: new BehaviorSubject<NaoUsersInterface.Role>(null),
  defaultNaoQueryOptions: { docName: 'doc' } as NaoStreamInterface.NaoQueryOptions
};

/**
 * Check if the session data is valid
 * todo: check all the elements
 */
export function checkSessionData(sessionData: any): any {
  return sessionData;
}


/**
 * Create permission list from policy
 */
export function createPermissionsFromPolicy(policyList: NaoUsersInterface.Policy[]): string[] {
  const list$ = [];
  // -->Loop: perms
  for (const pp of policyList) {
    if (Array.isArray(pp.permissions)) {
      // -->Make: list
      list$.push(...pp.permissions.map(p$ => `${pp.slug}:${p$}`));
    }
  }
  return list$;
}



/**
 * Create permission list from ngxPermissions.getPermissions(): NgxPermissionsObject
 */
export function createPermissionsFromNgxPermissions(perms$: NgxPermissionsObject): string[] {
  const list$ = [];

  if (isPlainObject(perms$) && Object.keys(perms$).length) {
    list$.push(...values(perms$).filter(pp => !!pp.name).map(pp => pp.name));
  }

  return list$;
}

/**
 * Find difference between perms
 */
export function findPermissionsDifference(
  oldPerms$: NgxPermissionsObject, newPerms$: string[]
): { addPerms: string[], removePerms: string[], perms: string[] } {
  const list$ = { addPerms: [], removePerms: [], perms: [] };
  // -->Get: old permissions
  const oldPerms = createPermissionsFromNgxPermissions(oldPerms$);
  // -->Get: difference
  list$.removePerms = difference(oldPerms, newPerms$);
  list$.addPerms = difference(newPerms$, oldPerms);
  list$.perms = newPerms$;

  return list$;
}


/**
 * Set the data from the local storage (if any)
 */
function setInitialTokens(): void {
  // -->Set: tokens
  const tokens = NaoUserAccessData.userStorage.getObject(NaoUserAccessData.accessTokens);
  if (tokens && typeof tokens.accessToken === 'string') {
    naoAccessToken$.next(tokens.accessToken);
  }
}
setInitialTokens();
