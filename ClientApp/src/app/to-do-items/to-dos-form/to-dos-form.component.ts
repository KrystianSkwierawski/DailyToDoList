import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskItem } from '../task-item.model';

@Component({
  selector: 'app-to-dos-form',
  templateUrl: './to-dos-form.component.html',
  styleUrls: ['./to-dos-form.component.scss']
})
export class ToDosFormComponent implements OnInit {

  form: FormGroup
  pickingColor: boolean = false;
  color = '#B8255F';

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  addToDo(title: string) {
    const task: TaskItem = {
      title,
      completed: false,
      expanded: false,
      color: this.color,
      subtasks: []
    };

    console.log(task);

    //this.tasks.push(task);
    //console.log(task);
    //console.log(title);
  }

  togglePickingColor() {
    this.pickingColor = !this.pickingColor;
  }
}
