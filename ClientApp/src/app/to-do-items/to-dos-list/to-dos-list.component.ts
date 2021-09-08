import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Task {
  title: string;
  completed: boolean;
  subtasks: Task[];
}

@Component({
  selector: 'app-to-dos-list',
  templateUrl: './to-dos-list.component.html',
  styleUrls: ['./to-dos-list.component.scss']
})
export class ToDosListComponent implements OnInit {

  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
 
  }

  updateAllComplete() {
    //this.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
  }

  someComplete(task: Task): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return task.subtasks.filter(t => t.completed).length > 0 && task.subtasks.filter(t => t.completed).length !== task.subtasks.length;
  }

  setAll(completed: boolean, task: Task) {
    if (!task || task.subtasks.length === 0)
      return;
    
    task.subtasks.forEach(t => t.completed = completed);
  }

  allSubTasksIsCompleteted(task: Task): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return (task.subtasks.filter(t => t.completed).length === task.subtasks.length);
  }

}
