import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksListComponent,
    AddTaskFormComponent,
    EditTaskFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TasksListComponent,
    AddTaskFormComponent,
  ]
})
export class TaskItemsModule { }
