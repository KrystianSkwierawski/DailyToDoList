import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToDosListComponent } from './to-do-items/to-dos-list/to-dos-list.component';
import {MatListModule} from '@angular/material/list';
import { ToDosFormComponent } from './to-do-items/to-dos-form/to-dos-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToDosListComponent,
    ToDosFormComponent,
    GenericListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
