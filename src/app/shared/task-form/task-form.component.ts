import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { TASKEMPTY, Task } from 'src/app/core/models/task';
import { AuthService } from 'src/app/core/services/auth-service';
import { TaskService } from 'src/app/core/services/task.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskData: Task = TASKEMPTY;
  categoryList : Category[]= [];
  
  isCreatorTask: boolean = true;
  submitBtnMsg : string = "";

  public taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    category: ['', [Validators.required]],
    priority: ['', [Validators.required, Validators.max(6), Validators.min(1)]],
    description: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService) {
      
  }
  ngOnInit(): void {
    this.loadCategoryList();
    
    if(this.isCreatorTask == true){
      this.submitBtnMsg = "Crear"
    }
    else{
      this.submitBtnMsg = "Guardar"
    }
  }

  isValidField(field: string): boolean {
    return this.validatorService.isValidField(this.taskForm, field);
  }


  isValidName(field: string): string | null {
    const errorMessage = this.validatorService.getFieldError(this.taskForm, field);
    return errorMessage ? errorMessage : null;
  }

  async onSubmit() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {

      let formValues = this.taskForm.value;
      this.taskData.title = formValues.title!;
      this.taskData.categoryId = parseInt(formValues.category!);
      this.taskData.priority = parseInt(formValues.priority!);
      this.taskData.description = formValues.description!;

      if (this.isCreatorTask) {
        this.taskData.userId = this.authService.userLogged.userId;
        this.registerTask(this.taskData);
      } else {
        this.updateTask(this.taskData);
      }
    }
  }



  async registerTask(taskForm: Task) {
    try {

      const postTask = await this.taskService.postNewTask(taskForm);
      if (postTask.ok) {
        console.log(postTask.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async updateTask(taskForm: Task) {
    try {

      const updateTask = await this.taskService.putTask(taskForm);
      if (updateTask.ok) {
        console.log(updateTask.data)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

async loadCategoryList(): Promise<void>{
  try {
    const resultCategoryList = await this.taskService.getCategories();
    if (resultCategoryList.ok) {
      this.categoryList = resultCategoryList.data;
    } else {
      const errorMessage = resultCategoryList.error;
      console.log(errorMessage)
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
  redirectToHomePage(): void {
    this.router.navigate(['/home']);
  }

}
