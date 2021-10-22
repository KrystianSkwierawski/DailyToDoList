import { TestBed } from '@angular/core/testing';
import { GenericListComponent } from './generic-list.component';



describe('GenericListComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GenericListComponent,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GenericListComponent);
    const app = fixture.componentInstance;
    app.list = [];
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should display empty state when list is empty', () => {
    const fixture = TestBed.createComponent(GenericListComponent);
    const app: GenericListComponent = fixture.componentInstance;
    app.list = [];
    app.initializedData = true;

    fixture.detectChanges();

    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });

  it('should display loading spinner when api did not returned initial data', () => {
    const fixture = TestBed.createComponent(GenericListComponent);
    const app: GenericListComponent = fixture.componentInstance;

    app.initializedData = false;
    app.list = [];
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.loading-content-container')).toBeTruthy();
  });

  it('should display content when list has items', () => {
    const fixture = TestBed.createComponent(GenericListComponent);
    const app: GenericListComponent = fixture.componentInstance;

    app.initializedData = true;
    app.list = [{}];
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.content')).toBeTruthy();
  });

});
