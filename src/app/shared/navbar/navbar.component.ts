import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { AuthService } from 'src/app/core/services/auth-service';
import { UserLogged } from 'src/app/core/models/userLogged';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userLogged : UserLogged = this.authService.userLogged;

  currentRoute: string = '';


  show: boolean = false;



  /**
   * Constructor to initialize the NavbarComponent.
   * @param authService - The authentication service.
   * @param router - The router service.
   */
  constructor(private authService : AuthService, private router: Router,   public dialog: MatDialog){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.currentRoute = this.router.url;
      }
    });
  }

  ngOnInit(): void {
    console.log("oninit");
    this.authService.isAuthenticated$().subscribe(
      (isAuthenticated) => {
        this.show = isAuthenticated;
      });
  }  


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogLogoutComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
