import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { TaskItemsService } from '../../shared/services/task-items.service';
import { appReducer, AppState } from '../../store/app.reducer';
import { TaskEffects } from '../store/task.effects';
import { TaskItem } from '../task-item.model';
import { AddTaskFormComponent } from './add-task-form.component';


describe('TasksListComponent', () => {
  let store: Store<AppState>;
  let taskItemsService: TaskItemsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddTaskFormComponent,
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([TaskEffects])
      ]
    });

    taskItemsService = TestBed.get(TaskItemsService);

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddTaskFormComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('[submit] should add task item', () => {
    // Arrange
    let taskItems: TaskItem[] = [];
    store.select('taskItems').subscribe(x => taskItems = x.taskItems);

    const expectedTask: TaskItem = {
      id: "1",
      title: "test",
      color: "#ffff"
    } as TaskItem;

    const fixture = TestBed.createComponent(AddTaskFormComponent);
    fixture.detectChanges();
    const app: AddTaskFormComponent = fixture.componentInstance;

    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(expectedTask));


    // Act
    app.submit(expectedTask.title);


    // Assert
    expect(taskItems[0]).toEqual(expectedTask);
  });
});
