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
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display empty state when list is empty', () => {
    const fixture = TestBed.createComponent(GenericListComponent);
    fixture.detectChanges();
    const app: GenericListComponent  = fixture.componentInstance;

    app.list = [];
    let compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });

  it('should display loading spinner when list is null', () => {
    const fixture = TestBed.createComponent(GenericListComponent);
    fixture.detectChanges();

    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.loading-content-container')).toBeTruthy();
  });

});
