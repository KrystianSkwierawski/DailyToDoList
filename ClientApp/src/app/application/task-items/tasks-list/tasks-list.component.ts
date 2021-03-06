import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../store/app.reducer';
import { DeleteTaskItemRemotely, GetTaskItems, StopEditingAllItems, UpdateTaskItemLocally, UpdateTaskItemRemotely, UpdateTaskItemsLocally, UpdateTaskItemsRemotely } from '../store/task.actions';
import { SubtaskItem } from '../subtask-item.model';
import { TaskItem } from '../task-item.model';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  columnsToDisplay: string[] = ['tasks'];
  @ViewChild(MatTable) tasksTable: MatTable<any>;

  isDraging: boolean = false;

  storeSub: Subscription;
  hoveredTaskIndex: number | null;
  hoveredSubtaskIndex: number | null;

  tasks: TaskItem[];
  initializedData: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('taskItems').subscribe(tasksState => {
      this.initializedData = tasksState.initializedData;
      this.tasks = tasksState.taskItems;
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

    this.isDraging = false;
  }

  onTableTouchMove(e: Event) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  toggleEditingTask(taskId: string) {
    this.store.dispatch(new StopEditingAllItems());

    const task = this.tasks.filter(x => x.id === taskId)[0];

    if (!task)
      return;

    const updatedTaskItem = {
      ...task,
      editing: !task.editing
    };

    this.store.dispatch(new UpdateTaskItemLocally(updatedTaskItem));
  }

  toggleEditingSubtask(taskId: string, subtask: SubtaskItem, index: number) {
    this.store.dispatch(new StopEditingAllItems());

    const task = this.tasks.filter(x => x.id === taskId)[0];

    if (!task)
      return;

    const updatedSubtask: SubtaskItem = {
      ...subtask,
      editing: !subtask.editing
    };

    const updatedSubtaskItems: SubtaskItem[] = [...task.subtaskItems];

    updatedSubtaskItems[index] = updatedSubtask;

    const updatedTask: TaskItem = {
      ...task,
      subtaskItems: updatedSubtaskItems
    }

    this.store.dispatch(new UpdateTaskItemLocally(updatedTask));
  }

  addSubtask(taskId: string) {
    this.store.dispatch(new StopEditingAllItems());

    const task = this.tasks.filter(x => x.id === taskId)[0];

    if (!task)
      return;

    const subtask: SubtaskItem = {
      title: `Task ${task.subtaskItems.length + 1}`,
      color: task.color,
      completed: false,
      editing: true
    };

    const updatedSubtaskItems: SubtaskItem[] = [...task.subtaskItems, subtask];

    const updatedTask: TaskItem = {
      ...task,
      expanded: true,
      subtaskItems: updatedSubtaskItems
    }

    this.store.dispatch(new UpdateTaskItemRemotely(updatedTask));
  }

  setHoveredTaskIndex(index: number | null = null) {
    this.hoveredTaskIndex = index;
  }

  setHoveredSubtaskIndex(index: number | null = null) {
    this.hoveredSubtaskIndex = index;
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

  someComplete(task: TaskItem): boolean {
    if (!task || task.subtaskItems.length === 0)
      return false;

    return task.subtaskItems.some(t => t.completed);
  }

  completeTask(task: TaskItem) {
    this.store.dispatch(new DeleteTaskItemRemotely(task.id));
  }

  onToggleExpandTask(task: TaskItem) {
    this.store.dispatch(new StopEditingAllItems());

    if (!task)
      return;

    const updatedTask: TaskItem = {
      ...task,
      expanded: !task.expanded
    }

    this.store.dispatch(new UpdateTaskItemLocally(updatedTask));
  }

  onDragStarted() {
    this.isDraging = true;

    //2. vibrate phone
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
