import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService){}

redirectEditPage() {
  this.router.navigate(['tarea/edit/:id']);
}
redirectCreatePage(){
  this.router.navigate(['tarea/create']);
}

}
