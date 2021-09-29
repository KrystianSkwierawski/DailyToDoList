import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ShortenPipe } from '../../shared/pipes/shorten/shorten.pipe';
import * as fromApp from '../../store/app.reducer';
import { AppState } from '../../store/app.reducer';
import { AddTaskItemRemotely } from '../store/task.actions';
import { TaskEffects } from '../store/task.effects';
import { TaskItem } from '../task-item.model';
import { TaskItemsService } from '../task-items.service';
import { TasksListComponent } from './tasks-list.component';



describe('TasksListComponent', () => {
  let store: Store<AppState>;
  let taskItemsService: TaskItemsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TasksListComponent,
        ShortenPipe
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
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges()
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('[completeTask] should complete task item', () => {
    // Arrange
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const taskItem: TaskItem = {
      id: "1",
      title: "test1",
    } as TaskItem;

    const addTaskItemSpy = spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    const deleteTaskItemSpy = spyOn(taskItemsService, 'deleteTaskItem').and.returnValue(of(taskItem.id));

    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.completeTask(taskItem);


    // Assert
    expect(app.tasks.length).toBe(0);
    expect(deleteTaskItemSpy).toHaveBeenCalledTimes(1);
    expect(addTaskItemSpy).toHaveBeenCalledTimes(1);
  });

  it('[updateOrderIndex] should update order index locally', () => {
    // Arrange
    const fixture = TestBed.createComponent(TasksListComponent);
    const app: TasksListComponent = fixture.componentInstance;
    fixture.detectChanges();

    const taskItems: TaskItem[] = [
      {
        id: "1",
        title: "test1",
        color: "#ffff",
        completed: true,
        expanded: false,
        subtaskItems: [],
        editing: false
      },
      {
        id: "2",
        title: "test2",
        color: "#ffff",
        completed: true,
        expanded: false,
        subtaskItems: [],
        editing: false
      },
    ];


    // Act
    app.tasks = taskItems;


    app.updateOrderIndex({
      currentIndex: 1,
      item: {
        data: app.tasks[0]
      }
    });


    // Assert
    const expectedResult = [...taskItems].reverse();
    expect(app.tasks).toEqual(expectedResult);
  });

});
