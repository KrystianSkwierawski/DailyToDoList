import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { AddTaskItemRemotely } from '../store/task.actions';



@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {

  form: FormGroup
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  color: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  submit(title: string) {
    this.store.dispatch(new AddTaskItemRemotely({ title, color: this.color }));
    this.formDirective.resetForm();
  }

  onColorChange(color: string) {
    this.color = color;
  }
}
