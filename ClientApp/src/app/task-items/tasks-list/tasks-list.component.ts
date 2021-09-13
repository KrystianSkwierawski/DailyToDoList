import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskItem } from '../task-item.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DeleteTaskItem } from '../store/task.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  animations: [
    trigger('list', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(200)
      ]),
      transition('* => void', [
        animate(205, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TasksListComponent implements OnInit, OnDestroy {

  storeSub: Subscription;
  hoveredTaskIndex: number | null;

  tasks: TaskItem[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('taskItems').subscribe(tasksState => {
      this.tasks = tasksState.taskItems
    });
  }

  setHoveredTaskIndex(index: number | null = null) {
    this.hoveredTaskIndex = index;
  }

  updateAllComplete() {
    //this.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
  }

  someComplete(task: TaskItem): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return task.subtasks.filter(t => t.completed).length > 0 && task.subtasks.filter(t => t.completed).length !== task.subtasks.length;
  }

  deleteTask(id: string) {
    this.store.dispatch(new DeleteTaskItem(id));
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
