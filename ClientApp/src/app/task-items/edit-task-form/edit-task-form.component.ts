import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { UpdateTaskItemRemotely } from '../store/task.actions';
import { SubtaskItem } from '../subtask-item.model';
import { TaskItem } from '../task-item.model';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {

  @Input() task: TaskItem;
  @Input() subtaskEditingData: { subtask: SubtaskItem, index: number };

  form: FormGroup
  color: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.subtaskEditingData) {
      this.form = new FormGroup({
        title: new FormControl(this.subtaskEditingData.subtask.title, [Validators.required])
      });

      return;
    }

    if (!this.subtaskEditingData) {
      this.form = new FormGroup({
        title: new FormControl(this.task.title, [Validators.required])
      });

      return;
    }
  }

  onColorChange(color: string) {
    this.color = color;
  }

  submit(title: string) {
    let updatedTask: TaskItem | undefined;

    if (this.subtaskEditingData) {
      const updatedSubtask: SubtaskItem = {
        ...this.subtaskEditingData.subtask,
        title: title,
        color: this.color,
        editing: false
      };

      const updatedSubtaskItems: SubtaskItem[] = [...this.task.subtaskItems];
      updatedSubtaskItems[this.subtaskEditingData.index] = updatedSubtask;

      updatedTask = {
        ...this.task,
        subtaskItems: updatedSubtaskItems
      }
    }

    if (!this.subtaskEditingData) {
      updatedTask = {
        ...this.task,
        title: title,
        color: this.color,
        editing: false
      };
    }

    if (updatedTask)
      this.store.dispatch(new UpdateTaskItemRemotely(updatedTask));
  }
}
