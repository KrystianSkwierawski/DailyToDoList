import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AddTaskItemLocally, UpdateTaskItemLocally } from '../store/task.actions';
import { TaskItem } from '../task-item.model';
import { EditTaskFormComponent } from './edit-task-form.component';


describe('TasksListComponent', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditTaskFormComponent,
      ],
      imports: [
        StoreModule.forRoot(fromApp.appReducer),
      ]
    });

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

    let taskItem: TaskItem = {
      id: "1",
      title: "test1",
      color: "#ffff",
      completed: false,
      editing: false,
      expanded: false,
      subtasks: []
    };

    const fixture = TestBed.createComponent(EditTaskFormComponent);
    const app: EditTaskFormComponent = fixture.componentInstance;
    app.task = taskItem;
    app.color = "#ffff";
    fixture.detectChanges();

    store.dispatch(new AddTaskItemLocally(app.task));

    store.select('taskItems').subscribe(state => taskItem = state.taskItems[0]);

    const updatedTaskItem: TaskItem = {
      ...taskItem,
      title: "test2",
      color: app.color
    };


    // Act
    store.dispatch(new UpdateTaskItemLocally(updatedTaskItem));


    // Assert
    expect(taskItem).toBe(updatedTaskItem);
  });

});
