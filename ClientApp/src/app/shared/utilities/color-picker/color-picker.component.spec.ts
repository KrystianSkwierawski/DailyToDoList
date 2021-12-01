import { TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';


describe('ColorPickerComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ColorPickerComponent,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ColorPickerComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should hide color-picker when click outside the compontent', () => {
    const fixture = TestBed.createComponent(ColorPickerComponent); 
    const app: ColorPickerComponent = fixture.componentInstance;
    app.pickingColor = true;
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));

    expect(app.pickingColor).toBeFalse();
  });
});
