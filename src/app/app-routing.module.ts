import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'tarea', component: HomeComponent },

  {
    path: 'tarea',
    children: [
      { path: 'edit/:id', component: TaskFormComponent },
      { path: 'create', component: NewTaskComponent },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
