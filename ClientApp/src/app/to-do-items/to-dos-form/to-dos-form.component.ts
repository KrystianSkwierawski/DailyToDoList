import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskItem } from '../task-item.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ToDoItemsActions from '../store/to-do.actions';



@Component({
  selector: 'app-to-dos-form',
  templateUrl: './to-dos-form.component.html',
  styleUrls: ['./to-dos-form.component.scss']
})
export class ToDosFormComponent implements OnInit {

  form: FormGroup
  color: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  addToDo(title: string) {
    const task: TaskItem = {
      title,
      completed: false,
      expanded: false,
      color: this.color,
      subtasks: [{ title: "asd", color: "#ffff", completed: false }]
    };

    console.log(task);

    this.store.dispatch(new ToDoItemsActions.AddToDoItem(task));
  }

  onColorChange(color: string) {
    this.color = color;
  }
}
