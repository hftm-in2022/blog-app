import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  #oidcSecurityService = inject(OidcSecurityService);

  authorize() {
    this.#oidcSecurityService.authorize();
  }

  logoff() {
    this.#oidcSecurityService
      .logoff()
      .subscribe((x) => console.log('signed out', x));
  }

  loginResponse = toSignal(
    this.#oidcSecurityService
      .checkAuth()
      .pipe(filter((loginRespose) => !!loginRespose)),
    { initialValue: { isAuthenticated: false } as LoginResponse },
  );
}
