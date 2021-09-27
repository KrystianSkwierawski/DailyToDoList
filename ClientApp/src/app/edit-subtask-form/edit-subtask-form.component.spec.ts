import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubtaskFormComponent } from './edit-subtask-form.component';

describe('EditSubtaskFormComponent', () => {
  let component: EditSubtaskFormComponent;
  let fixture: ComponentFixture<EditSubtaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubtaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubtaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
