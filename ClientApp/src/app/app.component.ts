import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from './store/app.reducer';


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
    this.storeSub = this.store.select('toDoItems').subscribe(toDoItemsState => {
      this.pendingTasksNumber = toDoItemsState.toDoItems.length;
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
