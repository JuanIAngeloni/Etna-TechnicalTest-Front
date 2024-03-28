import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { AuthService } from 'src/app/core/services/auth-service';
import { UserLogged } from 'src/app/core/models/userLogged';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  userLogged: UserLogged = this.authService.userLogged;

  currentRoute: string = '';

  show: boolean = false;

  incompleteTaskCounter: number = 0;
  private taskListSubscription?: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.currentRoute = this.router.url;
      }
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe(
      (isAuthenticated) => {
        this.show = isAuthenticated;
      });

    this.taskListSubscription = this.taskService.taskList$.subscribe(taskList => {
      this.incompleteTaskCounter = taskList.filter(task => !task.isCompleted).length;
    });
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogLogoutComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  redirectToTaskList() {
    this.router.navigate([`task`])
  }
}
