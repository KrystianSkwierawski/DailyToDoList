import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable } from 'rxjs';

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

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  constructor() { }

  addToDo(title: string) { 
  }

}
