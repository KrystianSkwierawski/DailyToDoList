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

  storeSub: Subscription;
  pendingTasksNumber: number;
  animationFinished: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('taskItems').subscribe(taskItemsState => {
      this.pendingTasksNumber = taskItemsState.taskItems.length;
    });
  }

  clearAllTaskItems() {
    this.store.dispatch(new ClearAllTasksItemsRemotely());
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
