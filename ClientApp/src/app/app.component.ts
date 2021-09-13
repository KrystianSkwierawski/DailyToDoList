import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from './store/app.reducer';
import * as ToDoItemsActions from './task-items/store/task.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  storeSub: Subscription;
  pendingTasksNumber: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('taskItems').subscribe(taskItemsState => {
      this.pendingTasksNumber = taskItemsState.taskItems.length;
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  clearAllTaskItems() {
    this.store.dispatch(new ToDoItemsActions.ClearAllTasksItems());
  }
}
