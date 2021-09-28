import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MaterialModule } from './material/material.module';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';
import { ColorPickerComponent } from './utilities/color-picker/color-picker.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';


@NgModule({
  declarations: [
    GenericListComponent,
    ColorPickerComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    GenericListComponent,
    ColorPickerComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
