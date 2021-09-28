import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../store/app.reducer';
import { TaskItem } from "../task-item.model";
import * as TasksActions from './task.actions';

@Injectable()
export class TaskEffects {

  @Effect()
  getTaskItems = this.actions$.pipe(
    ofType(TasksActions.GET_TASK_ITEMS),
    switchMap(() => {
      return this.http.get<TaskItem[]>(
        environment.apiUrl,
      );
    }),
    map(taskItems => {
      return new TasksActions.UpdateTaskItemsLocally(taskItems);
    })
  );

  @Effect()
  addTaskItemsRemotely = this.actions$.pipe(
    ofType(TasksActions.ADD_TASK_ITEM_REMOTELY),
    switchMap((action: TasksActions.AddTaskItemRemotely) => {
      const params = new HttpParams()
        .set('title', action.payload.title)
        .set('color', action.payload.color)

      return this.http.post<TaskItem>(
        environment.apiUrl,
        undefined,
        {
          params
        }
      );
    }),
    map(taskItem => {
      return new TasksActions.AddTaskItemLocally(taskItem);
    })
  );

  @Effect()
  updateTaskItemRemotely = this.actions$.pipe(
    ofType(TasksActions.UPDATE_TASK_ITEM_REMOTELY),
    switchMap((action: TasksActions.UpdateTaskItemRemotely) => {

      return this.http.put<TaskItem>(
        environment.apiUrl + `/${action.payload.id}`,
        action.payload
      ).pipe(
        map(() => action.payload)
      );

    }),
    map(taskItem => {
      if (taskItem.subtaskItems.every(t => t.completed))
        return new TasksActions.DeleteTaskItemRemotely(taskItem.id);

        return new TasksActions.UpdateTaskItemLocally(taskItem);
    })
  );

  @Effect({ dispatch: false })
  updateTaskItemsRemotely = this.actions$.pipe(
    ofType(TasksActions.UPDATE_TASK_ITEMS_REMOTELY),
    switchMap((action: TasksActions.UpdateTaskItemsRemotely) => {

      return this.http.put<TaskItem>(
        environment.apiUrl,
        action.payload
      ).pipe(
        map(() => action.payload)
      );

    })
  );

  @Effect()
  deleteTaskItemRemotely = this.actions$.pipe(
    ofType(TasksActions.DELETE_REMOTELY),
    switchMap((action: TasksActions.DeleteTaskItemRemotely) => {

      return this.http.delete<string>(
        environment.apiUrl + `/${action.payload}`
      ).pipe(
        map(() => action.payload)
      );

    }),
    map(id => {
      return new TasksActions.DeleteTaskItemLocally(id);
    })
  );

  @Effect()
  deleteAllRemotely = this.actions$.pipe(
    ofType(TasksActions.ClEAR_ALL_REMOTELY),
    switchMap(() => {

      return this.http.delete(
        environment.apiUrl
      );

    }),
    map(() => {
      return new TasksActions.ClearAllTasksItemsLocally();
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }
}
