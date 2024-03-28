import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskFilter } from 'src/app/core/models/taskFilter';
import { TaskUpdate } from 'src/app/core/models/taskUpdate';
import { AuthService } from 'src/app/core/services/auth-service';
import { TaskService } from 'src/app/core/services/task.service';
import { DialogDeleteTaskComponent } from 'src/app/pages/home/dialog-delete-task/dialog-delete-task.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  idTaskToUpdate: number = 0;
  taskList: TaskUpdate[] = [];
  formattedCreateDate: string = '';
  formattedUpdateDate: string = '';
  checkboxState: boolean = false;


  filtersToGetTaskList: TaskFilter = new TaskFilter;
  searchText: string = '';

  page!: number;


  constructor(
    private router: Router,
    private taskService: TaskService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.filtersToGetTaskList.isCompleted = false;
    this.loadTaskList();
  }

  async loadTaskList() {
    try {
      const resultTaskList = await this.taskService.getTaskList(this.filtersToGetTaskList);
      if (resultTaskList.ok) {
        this.taskList = resultTaskList.data;
        if(this.filtersToGetTaskList.isCompleted == false){
          this.taskService.updateTaskList(this.taskList);
        }

        this.taskList.forEach(task => {
          this.formattedCreateDate = this.formatDate(task.createDate);
          this.formattedUpdateDate = this.formatDate(task.updateDate);
          task.createDate = this.formattedCreateDate;
          task.updateDate = this.formattedUpdateDate;
        });
      } else {
        const errorMessage = resultTaskList.error;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  selectOption(option: boolean) {
    this.filtersToGetTaskList.isCompleted = option;
    this.loadTaskList();
  }
  searchTextChanged() {
    this.filtersToGetTaskList.text = this.searchText;
    this.loadTaskList()


  }
  deleteDialogComponent(idTask: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogDeleteTaskComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { idTask }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.loadTaskList();
      if (result) { }
    });
  }



  async setComplete(completed: boolean, taskToComplete: TaskUpdate) {
    try {
      taskToComplete.isCompleted = completed;
      const deleteTask = await this.taskService.UpdateIsCompletedTask(taskToComplete.taskId);
      if (deleteTask.ok) {
        this.loadTaskList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)} ${this.formatTime(date)}`;
    return formattedDate;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedTime;
  }

  redirectCreatePage() {
    this.router.navigate([`task/create`])
  }
  redirectEditPage(idTask: number) {
    this.router.navigate([`task/edit/${idTask}`])
  }

}
