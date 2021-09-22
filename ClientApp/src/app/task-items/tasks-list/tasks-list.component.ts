import { animate, state, style, transition, trigger } from '@angular/animations';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { DeleteTaskItemRemotely, GetTaskItems, ToggleAnimation, UpdateTaskItemLocally, UpdateTaskItemsLocally, UpdateTaskItemsRemotely } from '../store/task.actions';
import { TaskItem } from '../task-item.model';


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

  columnsToDisplay: string[] = ['tasks'];
  @ViewChild(MatTable) tasksTable: MatTable<any>;

  storeSub: Subscription;
  hoveredTaskIndex: number | null;
  animationIsRunning: boolean = false;

  tasks: TaskItem[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('taskItems').subscribe(tasksState => {
      this.tasks = tasksState.taskItems;
      this.animationIsRunning = tasksState.animationIsRunning;
    });

    this.store.dispatch(new GetTaskItems());
  }

  updateOrderIndex(event: any) {
    const previousIndex = this.tasks.findIndex(task => task === event.item.data);

    const updatedTaskItems = [...this.tasks];

    moveItemInArray(updatedTaskItems, previousIndex, event.currentIndex);

    this.store.dispatch(new UpdateTaskItemsLocally(updatedTaskItems));
    this.store.dispatch(new UpdateTaskItemsRemotely(updatedTaskItems));

    this.tasksTable.renderRows();
  }

  onTouchMove(e: Event) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  toggleAnimation(finishedAnimation: boolean) {
    this.store.dispatch(new ToggleAnimation(finishedAnimation));
  }


  toggleEditingTask(task: TaskItem) {
    const updatedTaskItem = {
      ...task,
      editing: true
    };

    this.store.dispatch(new UpdateTaskItemLocally(updatedTaskItem));
  }

  setHoveredTaskIndex(index: number | null = null) {
    this.hoveredTaskIndex = index;
  }

  updateAllComplete() {
    //this.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
  }

  someComplete(task: TaskItem): boolean {
    if (!task || task.subtasks?.length === 0)
      return false;

    return task.subtasks?.filter(t => t.completed)?.length > 0 && task.subtasks?.filter(t => t.completed)?.length !== task.subtasks?.length;
  }

  completeTask(task: TaskItem) {
    this.store.dispatch(new DeleteTaskItemRemotely(task.id));
  }

  //setAll(completed: boolean, task: TaskItem) {
  //  if (!task || task.subtasks?.length === 0)
  //    return;

  //  task.subtasks.forEach(t => t.completed = completed);
  //}

  onToggleExpandTask(task: TaskItem) {
    if (!task)
      return;

    task.expanded = !task.expanded;
  }

  allSubTasksIsCompleteted(task: TaskItem): boolean {
    if (!task || task.subtasks?.length === 0)
      return false;

    return (task.subtasks?.filter(t => t.completed)?.length === task.subtasks?.length);
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
