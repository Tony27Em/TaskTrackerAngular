import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../models/user.model';
import { HttpService } from '../../services/http.service';

import { Store, select } from '@ngrx/store';
import { selectUsers } from '../../state/data.selector';

export interface DialogData {
  animal: string;
  name: string;
}

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
    private _httpService: HttpService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _store: Store,
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
    // this._httpService.getUsers().subscribe(users => this.usersList = users);

    this._store.select(selectUsers).subscribe(users => this.usersList = users)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.taskForm.valid) return;

    this.dialogRef.close();
    console.log(this.taskForm.value);
      
  }
}
