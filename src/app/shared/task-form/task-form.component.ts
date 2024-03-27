import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { Task } from 'src/app/core/models/task';
import { TaskPost } from 'src/app/core/models/taskPost';
import { TASKUPDATEEMPTY, TaskUpdate } from 'src/app/core/models/taskUpdate';
import { AuthService } from 'src/app/core/services/auth-service';
import { TaskService } from 'src/app/core/services/task.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskData: TaskUpdate = TASKUPDATEEMPTY;
  categoryList: Category[] = [];

  isCreatorTask: boolean;
  submitBtnMsg: string;

  @Input() taskIdToUpdate: number;
  routeSubscription: Subscription;
  comeBackMsg: string;

  public taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(500)]],
    category: ['', [Validators.required]],
    priority: ['', [Validators.required, Validators.max(6), Validators.min(1)]],
    description: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService,
    private urlRoute: ActivatedRoute,) {
    this.routeSubscription = new Subscription;
    this.taskIdToUpdate = -1;
    this.submitBtnMsg = "";
    this.isCreatorTask = true;
    this.comeBackMsg = "";
  }

  ngOnInit(): void {
    this.loadCategoryList();
    this.isEditOrCreatorForm();
  }


  isEditOrCreatorForm() {
    this.routeSubscription = this.urlRoute.params.subscribe(params => {

      if (params['id']) {
        this.taskIdToUpdate = params['id'];
        this.isCreatorTask = false;
        this.LoadTaskByIdToUpdate(this.taskIdToUpdate);

      }
      else{
        this.submitBtnMsg = "Crear"
        this.comeBackMsg = "Nueva Tarea"
      }
    });
  }


  async LoadTaskByIdToUpdate(taskIdToUpdate: number) {
    try {
      const getTaskId = await this.taskService.getTaskById(taskIdToUpdate);
      if (getTaskId.ok) {
        console.log(getTaskId.data)
        this.taskData = getTaskId.data;

        this.taskForm.setValue({
          title: this.taskData.title,
          category: this.taskData.category.name,
          priority: this.taskData.priority.toString(),
          description: this.taskData.description,
        });
      }
    }
    catch (error) {
      console.log(error)
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
      this.taskData.priority = parseInt(formValues.priority!);
      this.taskData.description = formValues.description!;
      const categoryId = this.getCategoryIdByName(formValues.category!);
      if (categoryId !== undefined) {
        this.taskData.categoryId = categoryId


      if (this.isCreatorTask) {
        console.log("create")
        this.registerTask(this.taskData);
      } else {
        console.log("update")
        this.updateTask(this.taskData);
        }

      }
    }
  }



  async registerTask(taskData: Task) {
    try {
      taskData.userId = this.authService.userLogged.userId;
      console.log(this.authService.userLogged)
      console.log(244,taskData)
      let task :TaskPost = {title: taskData.title, description : taskData.description, priority : taskData.priority, userId: taskData.userId, categoryId:taskData.categoryId }
    
      const postTask = await this.taskService.postNewTask(task);
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

  async loadCategoryList(): Promise<void> {
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


  getCategoryIdByName(categoryName: string): number | undefined {
    const category = this.categoryList.find(category => category.name === categoryName);
    return category ? category.categoryId : undefined;
  }
  
  
  redirectToHomePage(): void {
    this.router.navigate(['/home']);
  }

}
