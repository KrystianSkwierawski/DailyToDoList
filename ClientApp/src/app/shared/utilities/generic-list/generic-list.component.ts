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

  onPan(event: any) {
    if (this.isDraging)
      return;

    const tasksListEl: HTMLElement | null = document.querySelector('.app-tasks-list');
    if (!tasksListEl)
      return;


    const decreasedSwipeDistance: number = (event.distance * 0.065);

    if (event.direction === Hammer.DIRECTION_UP)
      tasksListEl.scrollTop += decreasedSwipeDistance;

    if (event.direction === Hammer.DIRECTION_DOWN)
      tasksListEl.scrollTop -= decreasedSwipeDistance;
  }
}
