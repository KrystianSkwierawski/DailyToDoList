import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as TasksActions from '../../task-items/store/task.actions';
import { TaskItem } from '../../task-items/task-item.model';


@Injectable({
  providedIn: 'root'
})
export class TaskItemsService {

  constructor(private http: HttpClient) { }

  getTaskItems() {
    return this.http.get<TaskItem[]>(
      environment.apiUrl,
    );
  }

  addTaskItem(action: TasksActions.AddTaskItemRemotely) {
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
  }

  updateTaskItem(action: TasksActions.UpdateTaskItemRemotely): Observable<TaskItem> {
    return this.http.put<TaskItem>(
      environment.apiUrl + `/${action.payload.id}`,
      action.payload
    ).pipe(
      map(() => action.payload)
    );
  }

  updateTaskItems(action: TasksActions.UpdateTaskItemsRemotely) {
    return this.http.put<TaskItem>(
      environment.apiUrl,
      action.payload
    ).pipe(
      map(() => action.payload)
    );
  }

  deleteTaskItem(action: TasksActions.DeleteTaskItemRemotely) {
    return this.http.delete<string>(
      environment.apiUrl + `/${action.payload}`
    ).pipe(
      map(() => action.payload)
    );
  }

  deleteAllTaskItems() {
    return this.http.delete(
      environment.apiUrl
    );
  }
}
