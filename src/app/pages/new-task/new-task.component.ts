import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  isCreatorTask: boolean = false;

  constructor(
    private router: Router,
  ){}



  redirectToHomePage():void {
    this.router.navigate(['/home']);
    }
    
}
