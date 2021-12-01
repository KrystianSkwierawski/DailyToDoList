import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { TaskItemsService } from '../../../shared/services/task-items.service';
import { appReducer, AppState } from '../../../store/app.reducer';
import { AddTaskItemRemotely } from '../store/task.actions';
import { TaskEffects } from '../store/task.effects';
import { SubtaskItem } from '../subtask-item.model';
import { TaskItem } from '../task-item.model';
import { EditTaskFormComponent } from './edit-task-form.component';


describe('TasksListComponent', () => {
  let store: Store<AppState>;
  let taskItemsService: TaskItemsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditTaskFormComponent,
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducer),
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

  it('[submit] should edit task item when subtaskEditingData is undefined', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const taskItem: TaskItem = {
      id: "1",
      title: "test1",
      color: "#ffff",
    } as TaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      title: "test2",
      color: "#0000",
    } as TaskItem;

    const fixture = TestBed.createComponent(EditTaskFormComponent);

    const app: EditTaskFormComponent = fixture.componentInstance;
    app.subtaskEditingData = undefined;
    app.task = taskItem;
    fixture.detectChanges();


    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));

    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.submit(expectedTaskItem.title);


    // Assert
    expect(taskItems[0]).toEqual(expectedTaskItem);
  });

  it('[submit] should edit subtask item when subtaskEditingData is not undefined and not every subtasks is completed', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const taskItem: TaskItem = {
      id: "1",
      subtaskItems: [
        {
          title: "BeforeUpdate"
        }
      ]
    } as TaskItem;

    const updatedSubtaskItem: SubtaskItem = { title: "AfterUpdate" } as SubtaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      subtaskItems: [
        updatedSubtaskItem
      ]
    } as TaskItem;

    const fixture = TestBed.createComponent(EditTaskFormComponent);
    const app: EditTaskFormComponent = fixture.componentInstance;

    app.task = taskItem;
    app.subtaskEditingData = {
      subtask: updatedSubtaskItem,
      index: 0
    };

    fixture.detectChanges();

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));

    store.dispatch(new AddTaskItemRemotely(taskItem));

    // Act
    app.submit(expectedTaskItem.title);


    // Assert
    expect(taskItems[0].subtaskItems[0]).toEqual(updatedSubtaskItem);
  });

  it('[submit] should complete task item when subtaskEditingData is not undefined and every subtasks is completed', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const taskItem: TaskItem = {
      id: "1",
      subtaskItems: [
        {
          title: "BeforeUpdate"
        }
      ]
    } as TaskItem;

    const updatedSubtaskItem: SubtaskItem = { title: "AfterUpdate", completed: true } as SubtaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      subtaskItems: [
        updatedSubtaskItem
      ]
    } as TaskItem;

    const fixture = TestBed.createComponent(EditTaskFormComponent);
    const app: EditTaskFormComponent = fixture.componentInstance;

    app.task = taskItem;
    app.subtaskEditingData = {
      subtask: updatedSubtaskItem,
      index: 0
    };

    fixture.detectChanges();

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    spyOn(taskItemsService, 'deleteTaskItem').and.returnValue(of(taskItem.id));

    store.dispatch(new AddTaskItemRemotely(taskItem));

    // Act
    app.submit(expectedTaskItem.title);


    // Assert
    expect(taskItems.length).toBe(0);
  });
});
