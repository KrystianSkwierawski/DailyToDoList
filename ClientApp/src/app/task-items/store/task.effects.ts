import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { throwError } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { TaskItemsService } from "../task-items.service";
import * as TasksActions from './task.actions';

@Injectable()
export class TaskEffects {

  @Effect()
  getTaskItems$ = this.actions$.pipe(
    ofType(TasksActions.GET_TASK_ITEMS),
    switchMap(() => {
      return this.taskItemsService.getTaskItems();
    }),
    map(taskItems => {
      return new TasksActions.UpdateTaskItemsLocally(taskItems);
    })
  );

  @Effect()
  addTaskItemsRemotely$ = this.actions$.pipe(
    ofType(TasksActions.ADD_TASK_ITEM_REMOTELY),
    switchMap((action: TasksActions.AddTaskItemRemotely) => {
      return this.taskItemsService.addTaskItem(action);
    }),
    map(taskItem => {
      return new TasksActions.AddTaskItemLocally(taskItem);
    })
  );

  @Effect()
  updateTaskItemRemotely$ = this.actions$.pipe(
    ofType(TasksActions.UPDATE_TASK_ITEM_REMOTELY),
    switchMap((action: TasksActions.UpdateTaskItemRemotely) => {
      return this.taskItemsService.updateTaskItem(action);
    }),
    map(taskItem => {
      const everySubtaskIsCompleted: boolean = taskItem.subtaskItems?.every(t => t.completed);

      if (!everySubtaskIsCompleted)
      return new TasksActions.UpdateTaskItemLocally(taskItem);

      if (everySubtaskIsCompleted)
        return new TasksActions.DeleteTaskItemRemotely(taskItem.id);    

      return throwError("Internal Server Error");
    })
  );

  @Effect({ dispatch: false })
  updateTaskItemsRemotely$ = this.actions$.pipe(
    ofType(TasksActions.UPDATE_TASK_ITEMS_REMOTELY),
    switchMap((action: TasksActions.UpdateTaskItemsRemotely) => {
      return this.taskItemsService.updateTaskItems(action);
    })
  );

  @Effect()
  deleteTaskItemRemotely$ = this.actions$.pipe(
    ofType(TasksActions.DELETE_REMOTELY),
    switchMap((action: TasksActions.DeleteTaskItemRemotely) => {
      return this.taskItemsService.deleteTaskItem(action);
    }),
    map(id => {
      return new TasksActions.DeleteTaskItemLocally(id);
    })
  );

  @Effect()
  deleteAllRemotely$ = this.actions$.pipe(
    ofType(TasksActions.ClEAR_ALL_REMOTELY),
    switchMap(() => {
      return this.taskItemsService.deleteAllTaskItems();
    }),
    map(() => {
      return new TasksActions.ClearAllTasksItemsLocally();
    })
  );

  constructor(
    private actions$: Actions,
    private taskItemsService: TaskItemsService
  ) { }
}
