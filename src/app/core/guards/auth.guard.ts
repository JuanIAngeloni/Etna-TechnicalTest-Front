import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const permissionsGuard: CanActivateFn = async (route, state) => {
  return await inject(AuthService).guardValidation() ? true
  : inject(Router).navigate([`/login`]);

};

/**
 * Guard function to check user permissions before routing.
 * @param {Object} route - The route being navigated to.
 * @param {Object} state - The current state of the route.
 * @returns {boolean} Returns true if user isn't authenticated, otherwise redirects to home page.
 */
export const loginGuard: CanActivateFn = (route, state) => {
  return !(inject(AuthService).guardValidation()) ? true
  : inject(Router).navigate([`/login`]);

};

