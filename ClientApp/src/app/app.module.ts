import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import * as fromApp from './store/app.reducer';
import { TasksFormComponent } from './task-items/tasks-form/tasks-form.component';
import { TasksListComponent } from './task-items/tasks-list/tasks-list.component';
import { ColorPickerComponent } from './utilities/color-picker/color-picker.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { ShortenPipe } from './utilities/pipes/shorten/shorten.pipe';



@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TasksFormComponent,
    GenericListComponent,
    ColorPickerComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
