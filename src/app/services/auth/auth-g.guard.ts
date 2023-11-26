import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  return authService.getAuthToken();

}
