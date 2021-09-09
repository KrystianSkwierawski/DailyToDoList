import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color, ColorPickerControl } from '@iplab/ngx-color-picker';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  pickingColor: boolean = false;

  private _color: string;

  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this.colorChange.emit(color);
    this._color = color;
  }

  @Output()
  colorChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.color = '#B8255F';
  }

  togglePickingColor() {
    this.pickingColor = !this.pickingColor;
  }
}
