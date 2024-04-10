import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { USERLOGGEDEMPTY } from '../models/userLogged';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(){
    return this.authService.guardValidation().then(isValid => {
      if (isValid) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClearLoginSession {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(): boolean {
    this.authService.userLogged = USERLOGGEDEMPTY;
    this.authService.setUserInLocalStorage("");
    this.authService.isAuthenticated$().subscribe();
    return true;
  }
}


