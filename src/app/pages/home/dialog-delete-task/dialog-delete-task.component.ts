import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-dialog-delete-task',
  templateUrl: './dialog-delete-task.component.html',
  styleUrls: ['./dialog-delete-task.component.css']
})
export class DialogDeleteTaskComponent {

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogDeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idTask: number }
  ) { }

  async deleteTask() {
    try {
      const deleteTask = await this.taskService.deleteTask(this.data.idTask);
      if (deleteTask.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  }

}

