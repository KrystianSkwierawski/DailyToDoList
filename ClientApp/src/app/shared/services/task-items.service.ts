import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddTaskItemRemotely, DeleteTaskItemRemotely, UpdateTaskItemRemotely, UpdateTaskItemsRemotely } from '../../application/task-items/store/task.actions';
import { TaskItem } from '../../application/task-items/task-item.model';


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

  addTaskItem(action: AddTaskItemRemotely) {
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

  updateTaskItem(action: UpdateTaskItemRemotely): Observable<TaskItem> {
    return this.http.put<TaskItem>(
      environment.apiUrl + `/${action.payload.id}`,
      action.payload
    ).pipe(
      map(() => action.payload)
    );
  }

  updateTaskItems(action: UpdateTaskItemsRemotely) {
    return this.http.put<TaskItem>(
      environment.apiUrl,
      action.payload
    ).pipe(
      map(() => action.payload)
    );
  }

  deleteTaskItem(action: DeleteTaskItemRemotely) {
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
