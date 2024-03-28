import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskUpdate } from 'src/app/core/models/taskUpdate';
import { AuthService } from 'src/app/core/services/auth-service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  idTaskToUpdate : number = 0;
  taskList : TaskUpdate[] = [];
  
  constructor(
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService){}
  
    ngOnInit(): void {
  this.loadTaskList();  
  console.log(142, this.loadTaskList)
  }


  async loadTaskList(){
    try {
      const resultTaskList = await this.taskService.getTaskList();
      if (resultTaskList.ok) {
        this.taskList = resultTaskList.data;
        console.log(555,this.taskList)
      } else {
        const errorMessage = resultTaskList.error;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }









redirectEditPage(idTask: number) {
  console
  this.router.navigate([`task/edit/${idTask}`])

}
redirectCreatePage(){
  this.router.navigate(['task/create']);
}

}
