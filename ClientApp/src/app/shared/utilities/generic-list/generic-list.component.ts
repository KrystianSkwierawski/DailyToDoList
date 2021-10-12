import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent {

  @Input() list: Array<unknown>;
  @Input() apiReturnedInitialData: boolean;

  constructor() { }
}
