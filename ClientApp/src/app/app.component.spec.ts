import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { SetToken } from './authentication/store/authentication.actions';
import { appReducer, AppState } from './store/app.reducer';


describe('AppComponent', () => {
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StoreModule.forRoot(appReducer),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    const app: AppComponent = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should app.authenticated equal true if token exists', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();


    // Act
    store.dispatch(new SetToken("token"));


    // Assert
    expect(app.authenticated).toBeTrue();
  });

  it('should app.authenticated equal false if token does not exists', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(app.authenticated).toBeFalse();
  });

  it('should application if authenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    store.dispatch(new SetToken("123"));
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-application')).toBeTruthy();
  });

  it('should display authentication form if not authenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.authenticated = false;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-authentication-form')).toBeTruthy();
  });
})
