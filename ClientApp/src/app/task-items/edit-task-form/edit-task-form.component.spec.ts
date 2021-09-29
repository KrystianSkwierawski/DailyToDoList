import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { AddTaskItemLocally, AddTaskItemRemotely } from '../store/task.actions';
import { TaskEffects } from '../store/task.effects';
import { TaskItem } from '../task-item.model';
import { TaskItemsService } from '../task-items.service';
import { EditTaskFormComponent } from './edit-task-form.component';


describe('TasksListComponent', () => {
  let store: Store<fromApp.AppState>;
  let taskItemsService: TaskItemsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditTaskFormComponent,
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([TaskEffects]),
      ]
    });

    taskItemsService = TestBed.get(TaskItemsService);

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditTaskFormComponent);
    const app = fixture.componentInstance;
    app.task = { title: "test1" } as TaskItem;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('[submit] should edit task item', () => {
    // Arrange

    let taskItems: TaskItem[] = [];

    let taskItem: TaskItem = {
      id: "1",
      title: "test1",
      color: "#ffff",
      completed: false,
    } as TaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      title: "test2",
      color: "#0000"
    };

    const fixture = TestBed.createComponent(EditTaskFormComponent);
    const app: EditTaskFormComponent = fixture.componentInstance;
    app.task = taskItem;
    fixture.detectChanges();

    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(expectedTaskItem));

    store.dispatch(new AddTaskItemRemotely(taskItem));

    // Act
    app.submit(expectedTaskItem.title);

    // Assert

    expect(taskItems[0]).toBe(expectedTaskItem);
  });

});
