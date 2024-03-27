import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class TaskFormComponent implements OnInit, OnChanges {


  categoryList: Category[] = [];

  isCreatorTask: boolean;
  submitBtnMsg: string;

  @Output() formSubmit: EventEmitter<TaskUpdate> = new EventEmitter<TaskUpdate>();


  @Input() taskData: TaskUpdate = TASKUPDATEEMPTY;
  @Input() taskIdToUpdate: number;

  routeSubscription: Subscription;
  comeBackMsg: string;

  public taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(500)]],
    category: ['', [Validators.required]],
    priority: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
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
    this.taskData = TASKUPDATEEMPTY;
  }

  ngOnInit(): void {
    this.loadCategoryList();
    this.isEditOrCreatorForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskData'] && changes['taskData'].currentValue) {
      this.LoadFormToUpdate(changes['taskData'].currentValue);
    }
  }


  isEditOrCreatorForm() {
    if (this.taskIdToUpdate != -1) {
      this.isCreatorTask = false;

      this.LoadFormToUpdate(this.taskData);
    }
  }


  async LoadFormToUpdate(taskData: TaskUpdate) {
    try {
      this.taskForm.patchValue({
        title: taskData.title,
        category: taskData.category?.name!,
        priority: taskData.priority.toString(),
        description: taskData.description,
      });
    } catch (error) {
      console.log(error);
    }
  }

  isValidField(field: string): boolean {
    return this.validatorService.isValidField(this.taskForm, field);
  }


  isValidName(field: string): string | null {
    const errorMessage = this.validatorService.getFieldError(this.taskForm, field);
    return errorMessage ? errorMessage : null;
  }

  async getBackFormData() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {

      
      let formValues = this.taskForm.value;
      const categoryId = this.getCategoryIdByName(formValues.category!);
      
      this.taskData.title = formValues.title!;
      this.taskData.priority = parseInt(formValues.priority!);
      this.taskData.description = formValues.description!;
      
      if (categoryId !== undefined) {
        this.taskData.categoryId = categoryId

          this.formSubmit.emit(this.taskData);
        
      }
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
