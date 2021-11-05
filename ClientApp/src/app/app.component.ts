import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SetToken, SetTokenInLocalStorage } from './authentication/store/authentication.actions';
import { AppState } from './store/app.reducer';
import { ClearAllTasksItemsRemotely } from './task-items/store/task.actions';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  taskItemsStoreSub: Subscription;
  authenticationStoreSub: Subscription;
  webApp: boolean = environment.webApp;

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

  logout() {
    this.store.dispatch(new SetTokenInLocalStorage(null));
    this.store.dispatch(new SetToken(null));
  }

  ngOnDestroy(): void {
    this.taskItemsStoreSub.unsubscribe();
    this.authenticationStoreSub.unsubscribe();
  }
}
