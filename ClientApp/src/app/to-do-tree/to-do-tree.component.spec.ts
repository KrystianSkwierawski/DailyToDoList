import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTreeComponent } from './to-do-tree.component';

describe('ToDoTreeComponent', () => {
  let component: ToDoTreeComponent;
  let fixture: ComponentFixture<ToDoTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
