import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { TaskEffects } from '../store/task.effects';
import { TaskItem } from '../task-item.model';
import { TaskItemsService } from '../task-items.service';
import { AddTaskFormComponent } from './add-task-form.component';


describe('TasksListComponent', () => {
  let store: Store<fromApp.AppState>;
  let taskItemsService: TaskItemsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddTaskFormComponent,
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(fromApp.appReducer),
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

    const expectedTask: TaskItem = {
      id: "1",
      title: "test",
      color: "#ffff"
    } as TaskItem;

    const fixture = TestBed.createComponent(AddTaskFormComponent);
    fixture.detectChanges();
    const app: AddTaskFormComponent = fixture.componentInstance;
    app.color = expectedTask.color;
    spyOn(taskItemsService, 'addTaskItem').and.returnValue(of(expectedTask));

    store.select('taskItems').subscribe(x => taskItems = x.taskItems);


    // Act
    app.submit(expectedTask.title);


    // Assert
    expect(taskItems[0]).toBe(expectedTask);
  });
});
