import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './task-items/tasks-list/tasks-list.component';
import { AddTaskFormComponent } from './task-items/add-task-form/add-task-form.component';
import { EditTaskFormComponent } from './task-items/edit-task-form/edit-task-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent } from './application.component';


@NgModule({
  declarations: [
    TasksListComponent,
    AddTaskFormComponent,
    EditTaskFormComponent,
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [     
    ApplicationComponent
  ]
})
export class ApplicationModule { }
