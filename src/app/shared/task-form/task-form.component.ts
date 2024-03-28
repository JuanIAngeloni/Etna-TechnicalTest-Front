import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { TASKEMPTY, Task } from 'src/app/core/models/task';
import { TaskUpdate } from 'src/app/core/models/taskUpdate';
import { TaskService } from 'src/app/core/services/task.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges, OnDestroy {

  @Output() formSubmit: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() taskData: Task = TASKEMPTY;
  @Input() taskIdToUpdate: number;

  categoryList: Category[] = [];
  isCreatorTask: boolean;
  submitBtnMsg: string;
  routeSubscription: Subscription;
  comeBackMsg: string;

  public taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    category: ['', [Validators.required]],
    priority: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router,
    private taskService: TaskService) {
    this.routeSubscription = new Subscription;
    this.taskIdToUpdate = -1;
    this.submitBtnMsg = "";
    this.isCreatorTask = true;
    this.comeBackMsg = "";
  }

  ngOnInit(): void {
    this.loadCategoryList();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskData'] && changes['taskData'].currentValue) {
      this.LoadFormToUpdate(changes['taskData'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.taskForm.reset();
    this.routeSubscription.unsubscribe();
  }


  isEditOrCreatorForm() {
    if (this.taskIdToUpdate != -1) {
      this.isCreatorTask = false;
    }
  }

  async LoadFormToUpdate(taskData: TaskUpdate) {
    try {
      this.taskForm.patchValue({
        title: taskData.title,
        category:taskData.category.name,
        priority: taskData.priority.toString(),
        description: taskData.description,
      });
    } catch (error) {
      console.error("Error:", error);
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
        this.taskData.categoryId = categoryId;
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
        console.error(errorMessage);
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
