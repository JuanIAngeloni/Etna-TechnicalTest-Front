import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TASKUPDATEEMPTY, TaskUpdate } from 'src/app/core/models/taskUpdate';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  taskData: TaskUpdate = TASKUPDATEEMPTY;



  taskIdToUpdate: number;
  routeSubscription: Subscription;

  constructor(
    private router: Router,
    private urlRoute: ActivatedRoute
  ) {
    this.routeSubscription = new Subscription;
    this.taskIdToUpdate = -1;
  }

  ngOnInit(): void {
    this.isEditOrCreatorForm();
  }


  isEditOrCreatorForm() {
    this.routeSubscription = this.urlRoute.params.subscribe(params => {

      if (params['id']) {
        this.taskIdToUpdate = params['id'];
      }
    })
  }

  


  redirectToHomePage(): void {
    this.router.navigate(['/home']);
  }

}
