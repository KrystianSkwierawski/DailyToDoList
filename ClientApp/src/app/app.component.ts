import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './store/app.reducer';
import { ClearAllTasksItemsRemotely } from './task-items/store/task.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  taskItemsStoreSub: Subscription;
  authenticationStoreSub: Subscription;

  pendingTasksNumber: number;
  animationFinished: boolean;
  authenticated: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.taskItemsStoreSub = this.store.select('taskItems').subscribe(taskItemsState => {
      this.pendingTasksNumber = taskItemsState.taskItems.length;
    });

    this.authenticationStoreSub = this.store.select('authentication').subscribe(authenticationState => {
      this.authenticated = !!authenticationState.token;
    });
  }

  clearAllTaskItems() {
    this.store.dispatch(new ClearAllTasksItemsRemotely());
  }

  ngOnDestroy(): void {
    this.taskItemsStoreSub.unsubscribe();
    this.authenticationStoreSub.unsubscribe();
  }
}
