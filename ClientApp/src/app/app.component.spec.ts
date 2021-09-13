import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';
import { AddTaskItem, ClearAllTasksItems } from './task-items/store/task.actions';
import { TaskItem } from './task-items/task-item.model';


describe('AppComponent', () => {
  let store: Store<fromApp.AppState>;

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

    store.dispatch(new AddTaskItem(new TaskItem("1", "title")));
    store.dispatch(new AddTaskItem(new TaskItem("2", "title2")));

    expect(app.pendingTasksNumber).toBe(2);
  });

  it('should clear all task items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    store.dispatch(new AddTaskItem(new TaskItem("1", "title")));
    store.dispatch(new ClearAllTasksItems());

    expect(app.pendingTasksNumber).toBe(0);
  });
});
