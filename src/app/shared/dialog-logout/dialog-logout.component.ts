import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { USERLOGGEDEMPTY, UserLogged } from 'src/app/core/models/userLogged';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css']
})
export class DialogLogoutComponent {


  userLogged: UserLogged = USERLOGGEDEMPTY;


  constructor(
    public dialogRef: MatDialogRef<DialogLogoutComponent>,
    public authService: AuthService) {
    this.userLogged = this.authService.userLogged
  }

}
