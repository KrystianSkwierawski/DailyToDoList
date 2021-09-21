import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppInterceptor } from './app.interceptor';
import { MaterialModule } from './material/material.module';
import * as fromApp from './store/app.reducer';
import { TaskEffects } from './task-items/store/task.effects';
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
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([TaskEffects])
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
})
export class AppModule { }
