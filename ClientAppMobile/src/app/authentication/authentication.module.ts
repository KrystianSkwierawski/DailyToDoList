import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationFormComponent } from './authentication-form/authentication-form.component';


@NgModule({
  declarations: [
    AuthenticationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthenticationFormComponent
  ]
})
export class AuthenticationModule { }
