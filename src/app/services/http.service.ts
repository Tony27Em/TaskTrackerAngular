import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TaskType } from '../models/task.model';
import { UserType } from '../models/user.model';
import { TasksAction, UserAction } from '../state/data.action';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(
    private _http: HttpClient,
    private _store: Store,
  ) { }

  sendDataToStore(): void {
    this._http.get<Array<UserType>>('../assets/fakedata/users.json').subscribe(users => {
      this._store.dispatch(UserAction.retrievedUsers({ users }));
    })  

    this._http.get<Array<TaskType>>('../assets/fakedata/tasks.json').subscribe(tasks => {
      this._store.dispatch(TasksAction.retrievedTasks({ tasks }));
    })
  }
}
