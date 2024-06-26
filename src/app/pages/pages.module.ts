import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NewTaskComponent } from './new-task/new-task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateTaskComponent } from './update-task/update-task.component';
import {MatCardModule} from '@angular/material/card';
import { DialogDeleteTaskComponent } from './home/dialog-delete-task/dialog-delete-task.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NewTaskComponent,
    UpdateTaskComponent,
    DialogDeleteTaskComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRadioModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports:[RegisterComponent]
})
export class PagesModule { }
