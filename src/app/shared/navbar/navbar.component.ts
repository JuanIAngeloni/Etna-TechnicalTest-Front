import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { AuthService } from 'src/app/core/services/auth-service';
import { UserLogged } from 'src/app/core/models/userLogged';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userLogged : UserLogged = this.authService.userLogged;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService
      ) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogLogoutComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
