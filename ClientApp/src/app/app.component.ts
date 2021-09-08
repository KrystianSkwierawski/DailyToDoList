import { Component, OnInit } from '@angular/core';

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor() { }

}
