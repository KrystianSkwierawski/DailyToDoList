import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { appReducer, AppState } from '../../store/app.reducer';
import { ShortenPipe } from '../../utilities/pipes/shorten/shorten.pipe';
import { AddTaskItemLocally, DeleteTaskItemLocally, UpdateTaskItemsLocally } from '../store/task.actions';
import { TaskItem } from '../task-item.model';
import { TasksListComponent } from './tasks-list.component';


describe('TasksListComponent', () => {
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TasksListComponent,
        ShortenPipe
      ],
      imports: [
        StoreModule.forRoot(appReducer),
        BrowserAnimationsModule
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges()
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('[completeTask] should complete task item locally', () => {
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const taskItem: TaskItem = {
      id: "1",
      title: "test1",
      color: "#ffff",
      completed: true,
      expanded: false,
      subtasks: [],
      editing: false
    }

    store.dispatch(new AddTaskItemLocally(taskItem));
    store.dispatch(new AddTaskItemLocally({ title: "test1" } as TaskItem));

    store.dispatch(new DeleteTaskItemLocally(taskItem.id));

    expect(app.tasks.length).toBe(1);
  });

  it('[updateOrderIndex] should update order index locally', () => {
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
        subtasks: [],
        editing: false
      },
      {
        id: "2",
        title: "test2",
        color: "#ffff",
        completed: true,
        expanded: false,
        subtasks: [],
        editing: false
      },
    ];

    app.tasks = taskItems;

    app.updateOrderIndex({
      currentIndex: 1,
      item: {
        data: app.tasks[0]
      }
    });


    const expectedResult = taskItems.reverse();
    expect(app.tasks).toEqual(expectedResult);
  });

});
