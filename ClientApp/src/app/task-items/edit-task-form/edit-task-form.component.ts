import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { UpdateTaskItemRemotely } from '../store/task.actions';
import { TaskItem } from '../task-item.model';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {

  @Input() task: TaskItem;
  form: FormGroup
  color: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required])
    });
  }

  onColorChange(color: string) {
    this.color = color;
  }

  submit(title: string) {
    const updatedTask: TaskItem = {
      ...this.task,
      title: title,
      color: this.color,
      editing: false
    };

    this.store.dispatch(new UpdateTaskItemRemotely(updatedTask));
  }
}
