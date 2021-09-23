import { animate, state, style, transition, trigger } from '@angular/animations';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { DeleteTaskItemRemotely, GetTaskItems, ToggleAnimation, UpdateTaskItemLocally, UpdateTaskItemRemotely, UpdateTaskItemsLocally, UpdateTaskItemsRemotely } from '../store/task.actions';
import { SubtaskItem } from '../subtask-item.model';
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

    this.tasksTable?.renderRows();
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

  addSubtask(task: TaskItem) {
    if (!task)
      return;

    const subtask: SubtaskItem = {
      title: `Task ${task.subtaskItems.length + 1}`,
      color: task.color,
      completed: false
    };

    const updatedSubtaskItems: SubtaskItem[] = [...task.subtaskItems];
    updatedSubtaskItems.push(subtask);

    const updatedTask: TaskItem = {
      ...task,
      subtaskItems: updatedSubtaskItems
    }

    this.store.dispatch(new UpdateTaskItemRemotely(updatedTask));
  }

  setHoveredTaskIndex(index: number | null = null) {
    this.hoveredTaskIndex = index;
  }

  toggleCompleteSubtask(task: TaskItem, subtask: SubtaskItem, index: number) {
    const updatedSubtaskItem: SubtaskItem = {
      ...subtask,
      completed: !subtask.completed
    };

    const updatedSubtaskItems: SubtaskItem[] = [...task.subtaskItems];

    updatedSubtaskItems[index] = updatedSubtaskItem;

    const updatedTaskItem: TaskItem = {
      ...task,
      subtaskItems: updatedSubtaskItems
    }

    this.store.dispatch(new UpdateTaskItemRemotely(updatedTaskItem));
  }

  completeTaskIfAllSubtasksIsCompleted(task: TaskItem) {
    const allSubtasksIsCompleted: boolean = task.subtaskItems.every(t => t.completed);

    if (allSubtasksIsCompleted)
      this.completeTask(task);
  }

  someComplete(task: TaskItem): boolean {
    if (!task || task.subtaskItems?.length === 0)
      return false;

    return task.subtaskItems?.some(t => t.completed);
  }

  completeTask(task: TaskItem) {
    this.store.dispatch(new DeleteTaskItemRemotely(task.id));
  }

  onToggleExpandTask(task: TaskItem) {
    if (!task)
      return;

    const updatedTask: TaskItem = {
      ...task,
      expanded: !task.expanded
    }

    this.store.dispatch(new UpdateTaskItemLocally(updatedTask));
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
