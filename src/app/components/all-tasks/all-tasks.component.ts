import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TaskType, SortOrderType } from '../../models/task.model';
import { UserType } from '../../models/user.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})

export class AllTasksComponent {
  headers: Array<string> = [];
  allTasksOriginal: Array<TaskType> = [];
  allTasksChangeable: Array<TaskType> = [];
  users: Array<UserType> = [];
  sortOrder: SortOrderType[] = [];
  filterOptions: Record<string, Array<string>> = {};

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getUsers().subscribe(users => this.users = users);

    this._httpService.getData().subscribe(tasks => {
      this.allTasksOriginal = tasks;
      this.allTasksChangeable = tasks;

      this.headers = Object.keys(tasks[0]).map(item => {
        if (item === 'id') return 'task ID';
        if (item === 'performersID') return 'performers';
        return item;
      });

      this.sortOrder = this.headers.map(header => {
        return {
          header,
          order: 'original',
          icon: 'list'
        }
      })

      this.filterOptions = {
        deadline: ['none', ...new Set(tasks.map(item => item.deadline))],
        priority: ['none', ...new Set(tasks.map(item => item.priority))],
        status: ['none', ...new Set(tasks.map(item => item.status))],
        performers: ['none', ...this.users.map(user => user.name)],
      }
    })
  }

  onSort(header: string): void {
    const allTasks = [...this.allTasksOriginal];
    const selectedSort = this.sortOrder.find(item => item.header === header)!;

    this.sortOrder = this.sortOrder.map(item => {
      if(item.header !== selectedSort.header) {
        return {
          ...item,
          order: 'original',
          icon: 'list',
        }
      }
      return item;
    })

    this.toggleSortOrder(selectedSort);

    switch (selectedSort.order) {
      case 'ascending':
        this.allTasksChangeable = allTasks.sort((a: TaskType, b: TaskType) => ((a as any)[header]).localeCompare((b as any)[header]));
        break;
      case 'descending':
        this.allTasksChangeable = allTasks.sort((a: TaskType, b: TaskType) => ((b as any)[header]).localeCompare((a as any)[header]));
        break;
      case 'original':
        this.allTasksChangeable = allTasks;
        break;
    }
  }

  toggleSortOrder(selectedSort: SortOrderType): void {
    if (selectedSort.order === 'original') {
      selectedSort.order = 'ascending';
      selectedSort.icon = 'arrow_downward';
    } else if (selectedSort.order === 'ascending') {
      selectedSort.order = 'descending';
      selectedSort.icon = 'arrow_upward';
    } else if (selectedSort.order === 'descending') {
      selectedSort.order = 'original';
      selectedSort.icon = 'list';
    }
  }

  getPerformersAvatar(task: TaskType): Array<string> {
    return task.performersID.map((id: number) => {
      const user = this.users.find((user: UserType) => user.id === id);
      return user ? user.avatar ? user.avatar : 'user.png' : "";
    })    
  }

  onFilter(option: string, header: string): void {
    const allTasks = [...this.allTasksOriginal];
    
    if (option === 'none') {
      this.allTasksChangeable = allTasks;
      return;
    }

    this.allTasksChangeable = allTasks.filter(item => (item as any)[header] === option)
  }

  setSortIcon(header: string): string {
    return this.sortOrder.find(item => item.header === header)!.icon;
  }
}