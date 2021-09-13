import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskItem } from '../task-item.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-to-dos-list',
  templateUrl: './to-dos-list.component.html',
  styleUrls: ['./to-dos-list.component.scss']
})
export class ToDosListComponent implements OnInit, OnDestroy {

  storeSub: Subscription;

  tasks: TaskItem[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('toDoItems').subscribe(toDoItemsState => {
      this.tasks = toDoItemsState.toDoItems
    });   
  }

  updateAllComplete() {
    //this.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
  }

  someComplete(task: TaskItem): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return task.subtasks.filter(t => t.completed).length > 0 && task.subtasks.filter(t => t.completed).length !== task.subtasks.length;
  }

  setAll(completed: boolean, task: TaskItem) {
    if (!task || task.subtasks.length === 0)
      return;

    task.subtasks.forEach(t => t.completed = completed);
  }

  onToggleExpandTask(task: TaskItem) {
    if (!task)
      return;

    task.expanded = !task.expanded;
  }

  allSubTasksIsCompleteted(task: TaskItem): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return (task.subtasks.filter(t => t.completed).length === task.subtasks.length);
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
