import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { throwError } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { TaskItemsService } from "../../../shared/services/task-items.service";
import { AddTaskItemLocally, AddTaskItemRemotely, ADD_TASK_ITEM_REMOTELY, ClearAllTasksItemsLocally, ClEAR_ALL_TASK_ITEMS_REMOTELY, DeleteTaskItemLocally, DeleteTaskItemRemotely, DELETE_TASK_ITEM_REMOTELY, GET_TASK_ITEMS, UpdateTaskItemLocally, UpdateTaskItemRemotely, UpdateTaskItemsLocally, UpdateTaskItemsRemotely, UPDATE_TASK_ITEMS_REMOTELY, UPDATE_TASK_ITEM_REMOTELY } from "./task.actions";

@Injectable()
export class TaskEffects {

  @Effect()
  getTaskItems$ = this.actions$.pipe(
    ofType(GET_TASK_ITEMS),
    switchMap(() => {
      return this.taskItemsService.getTaskItems();
    }),
    map(taskItems => {
      return new UpdateTaskItemsLocally(taskItems);
    })
  );

  @Effect()
  addTaskItemsRemotely$ = this.actions$.pipe(
    ofType(ADD_TASK_ITEM_REMOTELY),
    switchMap((action: AddTaskItemRemotely) => {
      return this.taskItemsService.addTaskItem(action);
    }),
    map(taskItem => {
      return new AddTaskItemLocally(taskItem);
    })
  );

  @Effect()
  updateTaskItemRemotely$ = this.actions$.pipe(
    ofType(UPDATE_TASK_ITEM_REMOTELY),
    switchMap((action: UpdateTaskItemRemotely) => {
      return this.taskItemsService.updateTaskItem(action);
    }),
    map(taskItem => {
      return new UpdateTaskItemLocally(taskItem); 
    })
  );

  @Effect({ dispatch: false })
  updateTaskItemsRemotely$ = this.actions$.pipe(
    ofType(UPDATE_TASK_ITEMS_REMOTELY),
    switchMap((action: UpdateTaskItemsRemotely) => {
      return this.taskItemsService.updateTaskItems(action);
    })
  );

  @Effect()
  deleteTaskItemRemotely$ = this.actions$.pipe(
    ofType(DELETE_TASK_ITEM_REMOTELY),
    switchMap((action: DeleteTaskItemRemotely) => {
      return this.taskItemsService.deleteTaskItem(action);
    }),
    map(id => {
      return new DeleteTaskItemLocally(id);
    })
  );

  @Effect()
  deleteAllRemotely$ = this.actions$.pipe(
    ofType(ClEAR_ALL_TASK_ITEMS_REMOTELY),
    switchMap(() => {
      return this.taskItemsService.deleteAllTaskItems();
    }),
    map(() => {
      return new ClearAllTasksItemsLocally();
    })
  );

  constructor(
    private actions$: Actions,
    private taskItemsService: TaskItemsService
  ) { }
}
