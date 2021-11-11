import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ShortenPipe } from '../../../shared/pipes/shorten/shorten.pipe';
import { TaskItemsService } from '../../../shared/services/task-items.service';
import { appReducer, AppState } from '../../../store/app.reducer';
import { AddTaskItemRemotely } from '../store/task.actions';
import { TaskEffects } from '../store/task.effects';
import { SubtaskItem } from '../subtask-item.model';
import { TaskItem } from '../task-item.model';
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
        StoreModule.forRoot(appReducer),
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


  it('[addSubtask] should add subtask item', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);


    const fixture = TestBed.createComponent(TasksListComponent);
    const app: TasksListComponent = fixture.componentInstance;
    fixture.detectChanges();

    const taskItem: TaskItem = {
      id: "1",
      title: "test1",
      color: "#ffff",
      subtaskItems: [] as SubtaskItem[]
    } as TaskItem;

    const expectedSubtaskItem: SubtaskItem = {
      title: `Task ${taskItem.subtaskItems.length + 1}`,
      color: taskItem.color,
      completed: false,
      editing: false
    };

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      subtaskItems: [expectedSubtaskItem]
    }


    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));

    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.addSubtask(taskItem);


    // Assert
    expect(taskItems[0].subtaskItems.length).toBe(1);
    expect(taskItems[0].subtaskItems[0]).toEqual(expectedSubtaskItem);
  });

  it('[someCompleted] should return true if some subtasks is completed', () => {
    // Arrange
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const taskItem: TaskItem = {
      subtaskItems: [
        {
          completed: true
        },
        {
          completed: false
        }
      ]
    } as TaskItem;


    // Act
    const someCompletedResult: boolean = app.someComplete(taskItem);


    // Assert
    expect(someCompletedResult).toBeTrue();
  });

  it('[someCompleted] should return false if all subtasks is not completed', () => {
    // Arrange
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const taskItem: TaskItem = {
      subtaskItems: [
        {
          completed: false
        },
        {
          completed: false
        }
      ]
    } as TaskItem;


    // Act
    const someCompletedResult: boolean = app.someComplete(taskItem);

    // Assert
    expect(someCompletedResult).toBeFalse();
  });

  it('[toggleCompleteSubtask] should toggle subtaskItem.complete', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const fixture = TestBed.createComponent(TasksListComponent);
    const app: TasksListComponent = fixture.componentInstance;
    fixture.detectChanges();

    const subtaskItem: SubtaskItem = {
      completed: false
    } as SubtaskItem;

    const taskItem: TaskItem = {
      id: "1",
      subtaskItems: [
        subtaskItem,
        {
          completed: false
        }
      ]
    } as TaskItem;

    const updatedSubtaskItem: SubtaskItem = {
      ...subtaskItem,
      completed: !subtaskItem.completed
    };

    const updatedSubtaskItems: SubtaskItem[] = [...taskItem.subtaskItems];

    const subtaskItemIdex = 0;
    updatedSubtaskItems[subtaskItemIdex] = updatedSubtaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      subtaskItems: updatedSubtaskItems
    }

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.toggleCompleteSubtask(taskItem, subtaskItem, subtaskItemIdex);

    // Assert
    expect(taskItems[0].subtaskItems[subtaskItemIdex].completed).toBe(!subtaskItem.completed);
  });

  it('[toggleCompleteSubtask] should toggle subtaskItem.complete and delete task if all subtasks is completed', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const fixture = TestBed.createComponent(TasksListComponent);
    const app: TasksListComponent = fixture.componentInstance;
    fixture.detectChanges();

    const subtaskItem: SubtaskItem = {
      completed: false
    } as SubtaskItem;

    const taskItem: TaskItem = {
      id: "1",
      subtaskItems: [
        subtaskItem
      ]
    } as TaskItem;

    const updatedSubtaskItem: SubtaskItem = {
      ...subtaskItem,
      completed: !subtaskItem.completed
    };

    const updatedSubtaskItems: SubtaskItem[] = [...taskItem.subtaskItems];

    const subtaskItemIdex = 0;
    updatedSubtaskItems[subtaskItemIdex] = updatedSubtaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      subtaskItems: updatedSubtaskItems
    }

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    spyOn(taskItemsService, 'deleteTaskItem').and.returnValue(of(taskItem.id));
    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.toggleCompleteSubtask(taskItem, subtaskItem, subtaskItemIdex);

    // Assert
    expect(taskItems.length).toBe(0);
  });

  it('[toggleEditingTask] should toggle task.editing', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const taskItem: TaskItem = {
      editing: false
    } as TaskItem;

    const expectedTaskItem = {
      ...taskItem,
      editing: !taskItem.editing
    };

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.toggleEditingTask(taskItem);


    // Assert
    expect(taskItems[0].editing).toEqual(!taskItem.editing);
  });

  it('[toggleEditingSubtask] should toggle subtask.editing', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const subtaskItem: SubtaskItem = {
      editing: false
    } as SubtaskItem;

    const taskItem: TaskItem = {
      subtaskItems: [subtaskItem]
    } as TaskItem;

    const updatedSubtaskItem: SubtaskItem = {
      ...subtaskItem,
      editing: !subtaskItem.editing
    };

    const updatedSubtaskItems: SubtaskItem[] = [...taskItem.subtaskItems];
    const subtaskItemIdex = 0;
    updatedSubtaskItems[subtaskItemIdex] = updatedSubtaskItem;

    const expectedTaskItem: TaskItem = {
      ...taskItem,
      subtaskItems: updatedSubtaskItems
    }

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.toggleEditingSubtask(taskItem, subtaskItem, subtaskItemIdex);


    // Assert
    expect(taskItems[0].subtaskItems[subtaskItemIdex].editing).toBe(!subtaskItem.editing);
  });

  it('[onToggleExpandTask] should toggle task.expanded', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(state => taskItems = state.taskItems);

    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    const taskItem: TaskItem = {
      expanded: false,
    } as TaskItem;

    const expectedTaskItem = {
      ...taskItem,
      expanded: !taskItem.expanded
    };

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(taskItem));
    spyOn(taskItemsService, 'updateTaskItem').and.returnValue(of(expectedTaskItem));
    store.dispatch(new AddTaskItemRemotely(taskItem));


    // Act
    app.onToggleExpandTask(taskItem);


    // Assert
    expect(taskItems[0].expanded).toEqual(!taskItem.expanded);
  });
});
