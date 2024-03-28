import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { USERLOGGEDEMPTY, UserLogged } from 'src/app/core/models/userLogged';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css']
})
export class DialogLogoutComponent {

  userLogged: UserLogged = USERLOGGEDEMPTY;

logoutUser() {
  localStorage.removeItem("userToken");
  this.authService.userLogged = USERLOGGEDEMPTY;
  this.authService.isAuthenticated$();
  this.router.navigate([`/login`]);
}


  constructor(
    public dialogRef: MatDialogRef<DialogLogoutComponent>,
    public authService: AuthService,
    private router : Router) {
    this.userLogged = this.authService.userLogged;
  }

}
