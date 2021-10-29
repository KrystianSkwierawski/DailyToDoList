import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { appReducer, AppState } from '../../store/app.reducer';
import { AuthenticationFormComponent } from './authentication-form.component';

describe('AuthenticationFormComponent', () => {
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthenticationFormComponent,
      ],
      imports: [
        StoreModule.forRoot(appReducer),
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

  it('[submit] should set token', () => {
    let resultToken: string | null | undefined;

    store.select('authentication').subscribe(authenticationState => {
      resultToken = authenticationState.token;
    });

    const fixture = TestBed.createComponent(AuthenticationFormComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const expectedToken = "123";
    app.submit(expectedToken, false);

    expect(resultToken).toBe(expectedToken);
  });
})
