import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TaskType, SortOrderType } from '../../models/task.model';
import { UserType } from '../../models/user.model';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})


export class AllTasksComponent {
  headers: Array<string> = [];
  allTasksOriginal: Array<TaskType> = [];
  allTasksSortable: Array<TaskType> = [];
  users: Array<UserType> = [];
  sortOrder: SortOrderType = { order: 'original', icon: 'list' };

  priorityTypes: Array<string> = []; 

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getData().subscribe(tasks => {
      this.allTasksOriginal = tasks;
      this.allTasksSortable = tasks;

      this.headers = Object.keys(tasks[0]).map(item => {
        if (item === 'id') return 'task ID';
        if (item === 'performersID') return 'performers';
        return item;
      });
    })

    this._httpService.getUsers().subscribe(users => this.users = users);
  }

  onSort(header: string): void {
    const test = [...this.allTasksOriginal]

    switch (this.sortOrder.order) {
      case 'ascending':
        this.allTasksSortable = test.sort((a: TaskType, b: TaskType) => ((a as any)[header]).localeCompare((b as any)[header]));
        break;
      case 'descending':
        this.allTasksSortable = test.sort((a: TaskType, b: TaskType) => ((b as any)[header]).localeCompare((a as any)[header]));
        break;
      case 'original':
        this.allTasksSortable = test;
        break;
    }

    console.log('onSort');
  }

  toggleSortOrder(header: string): void {
    if (this.sortOrder.order === 'original') {
      this.sortOrder = { order: 'ascending', icon: 'arrow_downward' };
    } else if (this.sortOrder.order === 'ascending') {
      this.sortOrder = { order: 'descending', icon: 'arrow_upward' };
    } else if (this.sortOrder.order === 'descending') {
      this.sortOrder = { order: 'original', icon: 'list' };
    }
    this.onSort(header)
  }

  getPerformersAvatar(task: TaskType): Array<string> {
    return task.performersID.map((id: number) => {
      const user = this.users.find((user: UserType) => user.id === id);
      return user ? user.avatar ? user.avatar : 'user.png' : "";
    })
  }
}