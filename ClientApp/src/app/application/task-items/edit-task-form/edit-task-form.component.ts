import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { UpdateTaskItemRemotely } from '../store/task.actions';
import { SubtaskItem } from '../subtask-item.model';
import { TaskItem } from '../task-item.model';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit, AfterViewInit {

  @Input() task: TaskItem;
  @Input() subtaskEditingData: { subtask: SubtaskItem, index: number } | undefined;
  @ViewChild('titleInput') titleInput: ElementRef;

  form: FormGroup
  color: string;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    if (this.subtaskEditingData) {
      this.form = new FormGroup({
        title: new FormControl(this.subtaskEditingData.subtask.title, [
          Validators.required,
          Validators.maxLength(40)
        ])
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

  ngAfterViewInit(): void {
    if (this.subtaskEditingData) {
      this.titleInput?.nativeElement.focus();
      this.cdr.detectChanges();
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

  getErrorMessageFieldTitle() {
    const field = this.form.get('title');

    if (field?.hasError('required')) {
      return 'The title is required';
    }

    if (field?.hasError('maxlength')) {
      return 'The maximum title length is 40';
    }

    return '';
  }
}
