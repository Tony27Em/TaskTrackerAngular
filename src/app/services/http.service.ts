import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskType } from '../models/task.model';
import { Observable } from 'rxjs';
import { UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { }

  getData(): Observable<Array<TaskType>> {
    return this._http.get<Array<TaskType>>('../assets/fakedata/tasks.json');
  }

  getUsers(): Observable<Array<UserType>> {
    return this._http.get<Array<UserType>>('../assets/fakedata/users.json');
  }
}
