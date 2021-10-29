import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent {

  @Input() list: Array<unknown>;
  @Input() initializedData: boolean;
  @Input() isDraging: boolean;

  constructor() { }


  onPanUp(event: any) {
    if (this.isDraging)
      return;

    const tasksListEl: HTMLElement | null = document.querySelector('.app-tasks-list');
    if (!tasksListEl)
      return;

    tasksListEl.scrollTop += event.distance;
  }

  onPanDown(event: any) {
    if (this.isDraging)
      return;

    const tasksListEl: HTMLElement | null = document.querySelector('.app-tasks-list');
    if (!tasksListEl)
      return;

    tasksListEl.scrollTop -= event.distance;
  }
}
