import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { PermissionsGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:  'task', component: HomeComponent, canActivate:[PermissionsGuard] },
  {
    path: 'task',
    canActivate:[PermissionsGuard],
    children: [
      { path: 'edit/:id', component: UpdateTaskComponent, canActivate:[PermissionsGuard] },
      { path: 'create', component: NewTaskComponent, canActivate:[PermissionsGuard] },
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
