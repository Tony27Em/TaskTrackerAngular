import { Component } from '@angular/core';
import { TaskType } from '../../models/task.model';
import { UserType } from '../../models/user.model';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { selectTasks, selectUsers } from '../../state/data.selector';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  myID: number = 1;
  myTasks: Array<TaskType> = [];
  users: Array<UserType> = [];

  constructor(
    private _dialog: MatDialog,
    private _store: Store,
  ) { }
  
  ngOnInit() {
    this._store.select(selectTasks).subscribe(tasks => {
      return this.myTasks = tasks.filter(item => item.performersID.includes(this.myID));
    });
    this._store.select(selectUsers).subscribe(users => this.users = users);
  } 

  openModal(): void {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data: { message: 'test' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
