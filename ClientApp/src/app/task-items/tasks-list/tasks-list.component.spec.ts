import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ShortenPipe } from '../../utilities/pipes/shorten/shorten.pipe';
import { AddTaskItem } from '../store/task.actions';
import { TaskItem } from '../task-item.model';
import { TasksListComponent } from './tasks-list.component';


describe('TasksListComponent', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TasksListComponent,
        ShortenPipe
      ],
      imports: [
        StoreModule.forRoot(fromApp.appReducer),
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

  it('should delete task item', () => {
    const fixture = TestBed.createComponent(TasksListComponent);
    fixture.detectChanges();
    const app: TasksListComponent = fixture.componentInstance;

    store.dispatch(new AddTaskItem(new TaskItem("1", "title")));
    store.dispatch(new AddTaskItem(new TaskItem("2", "title2")));

    app.deleteTask("1");

    expect(app.tasks.length).toBe(1);
  });

});
