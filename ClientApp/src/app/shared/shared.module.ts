import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { MaterialModule } from './material/material.module';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';
import { ColorPickerComponent } from './utilities/color-picker/color-picker.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { AuthViewComponent } from './utilities/auth-view/auth-view.component';


@NgModule({
  declarations: [
    GenericListComponent,
    ColorPickerComponent,
    ShortenPipe,
    AuthViewComponent
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
    AuthViewComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
