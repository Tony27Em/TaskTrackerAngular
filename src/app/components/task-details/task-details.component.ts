import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskType } from '../../models/task.model';
import { selectTasks, selectUsers } from '../../state/data.selector';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksAction } from '../../state/data.action';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent {
  selectedTask: TaskType = {} as TaskType;
  users$ = this._store.select(selectUsers);
  taskForm: FormGroup = {} as FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this._store.select(selectTasks).subscribe(tasks => {
        this.selectedTask = tasks.find(item => item.id === param['id'])!;
        this.initForm();
      })
    })
  }

  initForm(): void {
    this.taskForm = this._formBuilder.group({
      title: [this.selectedTask?.title, Validators.required],
      deadline: [this.selectedTask?.deadline, Validators.required],
      description: [this.selectedTask?.description],
      status: [this.selectedTask?.status],
      priority: [this.selectedTask?.priority, Validators.required],
      performers: [this.selectedTask?.performersID, Validators.required],
    });
  }

  onSubmit(): void {
    const task: TaskType = {
      id: this.selectedTask.id,
      title: this.taskForm.get('title')!.value,
      description: this.taskForm.get('description')!.value,
      deadline: this.formatDate(this.taskForm.get('deadline')!.value),
      priority: this.taskForm.get('priority')!.value,
      status: 'Planned',
      performersID: this.taskForm.get('performers')!.value,
    } 
    this._store.dispatch(TasksAction.editTask({ task }));
    this._location.back();
  }

  onCancel(event: MouseEvent): void {
    event.preventDefault();
    this._location.back();
  }

  formatDate(date: Date): string {
    const dateObject = new Date(date);
    const day = dateObject.getDate().toString();
    const month = (dateObject.getMonth() + 1).toString();
    const year = dateObject.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
