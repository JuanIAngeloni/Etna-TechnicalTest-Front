import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/core/models/task';
import { TaskPost } from 'src/app/core/models/taskPost';
import { TASKUPDATEEMPTY, TaskUpdate } from 'src/app/core/models/taskUpdate';
import { AuthService } from 'src/app/core/services/auth-service';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskFormComponent } from 'src/app/shared/task-form/task-form.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {


  @ViewChild(TaskFormComponent)
  taskFormComponent!: TaskFormComponent;


  taskData: TaskUpdate = TASKUPDATEEMPTY;
  taskIdToUpdate: number;
  routeSubscription: Subscription;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.routeSubscription = new Subscription;
    this.taskIdToUpdate = -1;
  }


  async onFormSubmit(taskData: Task) {
    try {

      taskData.userId = this.authService.userLogged.userId;

      let task: TaskPost = { 
        title: taskData.title, 
        description: taskData.description, 
        priority: taskData.priority, 
        userId: taskData.userId, 
        categoryId: taskData.categoryId 
      };     

      const postTask = await this.taskService.postNewTask(task);
      if (postTask.ok) {
        
        this.taskData = postTask.data;
        this.redirectToHomePage()
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  saveTask() {
    this.taskFormComponent.getBackFormData();
  }

  redirectToHomePage(): void {
    this.router.navigate(['/task']);
  }

}
