import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AuthenticationFormComponent } from './authentication-form.component';

describe('AuthenticationFormComponent', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthenticationFormComponent,
      ],
      imports: [
        StoreModule.forRoot(fromApp.appReducer),
      ]
    });


    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AuthenticationFormComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
})
