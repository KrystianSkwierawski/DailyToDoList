import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDosFormComponent } from './to-dos-form.component';

describe('ToDosFormComponent', () => {
  let component: ToDosFormComponent;
  let fixture: ComponentFixture<ToDosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
