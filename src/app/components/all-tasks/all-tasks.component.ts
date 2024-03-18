import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TaskType } from '../../models/task.model';
import { UserType } from '../../models/user.model';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})

export class AllTasksComponent {
  headers: Array<string> = [];
  allTasks: Array<TaskType> = [];
  users: Array<UserType> = [];

  constructor(private _httpService: HttpService) { }
 
  ngOnInit(): void {
    this._httpService.getData().subscribe(tasks => {
      this.allTasks = tasks;
      this.headers = Object.keys(tasks[0]).map(item => {
        if(item === 'id') return 'task ID';
        if(item === 'performersID') return 'performers';
        return item;
      });
    })

    this._httpService.getUsers().subscribe(users => this.users = users);
  }

  onSort(header: string): void {
    this.allTasks = this.allTasks.sort((a, b) => (a as any)[header].localeCompare((b as any)[header]))
  }

  getPerformersAvatar(task: TaskType): Array<string> {
    return task.performersID.map((id: number) => {
      const user = this.users.find((user: UserType) => user.id === id);
      return user ? user.avatar ? user.avatar : 'user.png' : "";
    })
  }
}