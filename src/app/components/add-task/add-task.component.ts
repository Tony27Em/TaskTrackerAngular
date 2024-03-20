import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../models/user.model';
import { Store, select } from '@ngrx/store';
import { selectUsers } from '../../state/data.selector';
import { TasksAction } from '../../state/data.action';
import { TaskType } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})

export class AddTaskComponent {
  taskForm: FormGroup;
  users = new FormControl('');
  usersList: Array<UserType> = [];

  constructor(
    private _store: Store,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
  ) {
    this.taskForm = this._formBuilder.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      description: ['No description'],
      priority: ['low', Validators.required],
      performers: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._store.select(selectUsers).subscribe(users => this.usersList = users)
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.taskForm.valid) return;
    this.dialogRef.close();

    const task: TaskType = {
      id: Math.random().toString().replace(/\./g, '').slice(0, 10),
      title: this.taskForm.get('title')!.value,
      description: this.taskForm.get('description')!.value,
      deadline: this.formatDate(this.taskForm.get('deadline')!.value),
      priority: this.taskForm.get('priority')!.value,
      status: 'Planned',
      performersID: this.taskForm.get('performers')!.value,
    }

    this._store.dispatch(TasksAction.addTask({ task }));
  }

  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
