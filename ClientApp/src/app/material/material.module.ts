import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressSpinnerModule,
    ColorPickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
