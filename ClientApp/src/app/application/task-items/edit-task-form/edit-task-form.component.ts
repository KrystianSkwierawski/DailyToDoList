import { AfterViewChecked, ChangeDetectorRef, HostListener } from '@angular/core';
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

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private elementRef: ElementRef) { }

  ngOnInit(): void {
    const title: string = (this.subtaskEditingData) ? this.subtaskEditingData.subtask.title : this.task.title;

    this.form = new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.maxLength(40)
      ])
    });
  }

  ngAfterViewInit(): void {
    this.titleInput?.nativeElement.focus();
    this.cdr.detectChanges();
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

  @HostListener('document:mousedown', ['$event'])
  submitIfClickOutsideCompontent(event: any) {
    const clickedInsideThisCompontent: boolean = this.elementRef.nativeElement.contains(event.target);
    const clickedEditTaskButton: boolean = event.target.matches('.toggle-editing-task-button, .toggle-editing-task-button *')

    if (!clickedInsideThisCompontent && !clickedEditTaskButton) {
      const title: string = this.titleInput.nativeElement.value;
      this.submit(title);
    }
  }
}
