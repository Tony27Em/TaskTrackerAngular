import { Component } from '@angular/core';
import { TaskType } from '../../models/task.model';
import { UserType } from '../../models/user.model';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { selectTasks, selectUsers } from '../../state/data.selector';
import { TasksAction } from '../../state/data.action';

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
  
  ngOnInit(): void {
    this._store.select(selectTasks).subscribe(tasks => {
      return this.myTasks = tasks.filter(item => item.performersID.includes(this.myID));
    });
    this._store.select(selectUsers).subscribe(users => this.users = users);
  } 

  openModal(): void {
    this._dialog.open(AddTaskComponent);
  }

  onDelete(taskID: string): void {
    this._store.dispatch(TasksAction.removeTask({ taskID }));
  }
}
