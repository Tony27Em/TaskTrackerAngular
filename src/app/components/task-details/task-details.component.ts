import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { TaskType } from '../../models/task.model';
import { selectTasks } from '../../state/data.selector';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent {
  selectedTask: TaskType = {} as TaskType;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _store: Store,
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(param => {
      console.log(param);

      this._store.select(selectTasks).subscribe(tasks => {
        this.selectedTask = tasks.find(item => item.id === param['id'])!;
      })
    })
  }


}
