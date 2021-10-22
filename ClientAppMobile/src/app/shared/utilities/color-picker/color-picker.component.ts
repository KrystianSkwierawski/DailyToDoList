import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() initialColor: string = '#B8255F';
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

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.color = this.initialColor;
  }

  @HostListener('document:click', ['$event'])
  hideColorPickerIfClickOutsideCompontent(event: Event) {

    const clickedInsideThisCompontent: boolean = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInsideThisCompontent) {
      this.pickingColor = false;
    }
  }

  togglePickingColor() {
    this.pickingColor = !this.pickingColor;
  }
}
