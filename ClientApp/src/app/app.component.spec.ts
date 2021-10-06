import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';
import { AppState } from './store/app.reducer';
import { AddTaskItemLocally } from './task-items/store/task.actions';
import { TaskEffects } from './task-items/store/task.effects';
import { TaskItem } from './task-items/task-item.model';
import { TaskItemsService } from './task-items/task-items.service';


describe('AppComponent', () => {
  let store: Store<AppState>;
  let taskItemsService: TaskItemsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([TaskEffects])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    taskItemsService = TestBed.get(TaskItemsService);

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
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    store.dispatch(new AddTaskItemLocally({ title: "test1" } as TaskItem));
    spyOn(taskItemsService, 'deleteAllTaskItems').and.returnValue(of(new Observable<Object>()));


    // Act
    app.clearAllTaskItems();


    // Assert
    expect(app.pendingTasksNumber).toBe(0);
  });
});
