import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';
import { AppState } from './store/app.reducer';
import { AddTaskItemLocally, ClearAllTasksItemsLocally } from './task-items/store/task.actions';
import { TaskItem } from './task-items/task-item.model';


describe('AppComponent', () => {
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.appReducer)
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    const app: AppComponent = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should has 0 of pending tasks by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.pendingTasksNumber).toBe(0);
  });

  it('should has 2 of pending tasks', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    store.dispatch(new AddTaskItemLocally({ title: "test1" } as TaskItem));
    store.dispatch(new AddTaskItemLocally({ title: "test2" } as TaskItem));

    expect(app.pendingTasksNumber).toBe(2);
  });

  it('[clearAllTaskItems] should clear all task items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    store.dispatch(new AddTaskItemLocally({ title: "test1" } as TaskItem));
    store.dispatch(new ClearAllTasksItemsLocally());

    expect(app.pendingTasksNumber).toBe(0);
  });
});
