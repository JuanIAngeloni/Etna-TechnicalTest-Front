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

  idTaskToUpdate : number = 0;
  
  constructor(
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService){}








redirectEditPage() {
  this.router.navigate([`tarea/edit/${this.idTaskToUpdate}`])

}
redirectCreatePage(){
  this.router.navigate(['tarea/create']);
}

}
