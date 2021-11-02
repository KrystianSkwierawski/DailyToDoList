import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import * as Hammer from 'hammerjs';
import { MaterialModule } from './material/material.module';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';
import { ColorPickerComponent } from './utilities/color-picker/color-picker.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';


export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    GenericListComponent,
    ColorPickerComponent,
    ShortenPipe,
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    MaterialModule,
    HammerModule
  ],
  exports: [
    MaterialModule,
    GenericListComponent,
    ColorPickerComponent,
    ShortenPipe
  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }],
})
export class SharedModule { }

