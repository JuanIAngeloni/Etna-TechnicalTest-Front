import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TASKUPDATEEMPTY, TaskUpdate } from 'src/app/core/models/taskUpdate';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskFormComponent } from 'src/app/shared/task-form/task-form.component';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  @ViewChild(TaskFormComponent) 
  taskFormComponent!: TaskFormComponent ;


  ngAfterViewInit() {
    console.log( this.taskFormComponent);
  }  

  taskData: TaskUpdate = TASKUPDATEEMPTY;
  taskIdToUpdate: number;
  routeSubscription: Subscription;

  constructor(
    private router: Router,
    private urlRoute: ActivatedRoute,
    private taskService : TaskService
  ) {
    this.routeSubscription = new Subscription;
    this.taskIdToUpdate = -1;

  }

  ngOnInit(): void {
    this.LoadTaskByIdToUpdate();
  }



  async LoadTaskByIdToUpdate() {
    try {
      this.routeSubscription = this.urlRoute.params.subscribe(params => {
        if (params['id']) {
          this.taskIdToUpdate = params['id'];
        }
      })
      const getTaskId = await this.taskService.getTaskById(this.taskIdToUpdate);
      if (getTaskId.ok) {
        console.log(getTaskId.data)
        this.taskData = getTaskId.data;
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async onFormSubmit(taskData: TaskUpdate) { 
    try {
      console.log(213,taskData); 
      const updateTask = await this.taskService.putTask(taskData);
      if (updateTask.ok) {
        this.taskData = updateTask.data;
        console.log(this.taskData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  saveTask() {
  this.taskFormComponent.getBackFormData();
  }

  redirectToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
