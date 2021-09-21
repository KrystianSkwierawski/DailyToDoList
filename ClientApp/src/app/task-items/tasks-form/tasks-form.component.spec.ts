import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AddTaskItemLocally } from '../store/task.actions';
import { TaskItem } from '../task-item.model';
import { TasksFormComponent } from './tasks-form.component';


describe('TasksListComponent', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TasksFormComponent,
      ],
      imports: [
        StoreModule.forRoot(fromApp.appReducer),
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TasksFormComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('[addTask] should add task item', () => {
    let numberOfTaskItems: number = 0;

    const fixture = TestBed.createComponent(TasksFormComponent);
    fixture.detectChanges();
    const app: TasksFormComponent = fixture.componentInstance;

    store.select('taskItems').pipe().subscribe(x => numberOfTaskItems = x.taskItems.length);

    store.dispatch(new AddTaskItemLocally({} as TaskItem));

    expect(numberOfTaskItems).toBe(1);
  });

});
