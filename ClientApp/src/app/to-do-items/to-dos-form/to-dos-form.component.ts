import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-dos-form',
  templateUrl: './to-dos-form.component.html',
  styleUrls: ['./to-dos-form.component.scss']
})
export class ToDosFormComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  addToDo(title: string) {
    //const task: Task = {
    //  title,
    //  completed: false,
    //  subtasks: []
    //};

    //this.tasks.push(task);
    //console.log(task);
    //console.log(title);
  }
}
