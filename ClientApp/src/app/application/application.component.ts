import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SetToken, SetTokenInLocalStorage } from '../authentication/store/authentication.actions';
import { AppState } from '../store/app.reducer';
import { ClearAllTasksItemsRemotely } from './task-items/store/task.actions';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  taskItemsStoreSub: Subscription;
  pendingTasksNumber: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.taskItemsStoreSub = this.store.select('taskItems').subscribe(taskItemsState => {
      this.pendingTasksNumber = taskItemsState.taskItems.length;
    });
  }

  clearAllTaskItems() {
    this.store.dispatch(new ClearAllTasksItemsRemotely());
  }

  logout() {
    this.store.dispatch(new SetTokenInLocalStorage(null));
    this.store.dispatch(new SetToken(null));
  }

  ngOnDestroy(): void {
    this.taskItemsStoreSub.unsubscribe();
  }
}
