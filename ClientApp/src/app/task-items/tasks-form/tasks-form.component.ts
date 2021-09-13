import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskItem } from '../task-item.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as tasksActions from '../store/task.actions';



@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss']
})
export class TasksFormComponent implements OnInit {

  form: FormGroup
  color: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  addTask(title: string) {
    // id placeholder from db
    const id = Math.random().toString(36).substr(2, 5);
    const task = new TaskItem(id, title, this.color);

    this.store.dispatch(new tasksActions.AddTaskItem(task));
  }

  onColorChange(color: string) {
    this.color = color;
  }
}
