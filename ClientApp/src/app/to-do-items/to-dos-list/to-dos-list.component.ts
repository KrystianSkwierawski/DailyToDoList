import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../task-item.model';

@Component({
  selector: 'app-to-dos-list',
  templateUrl: './to-dos-list.component.html',
  styleUrls: ['./to-dos-list.component.scss']
})
export class ToDosListComponent implements OnInit {

  tasks: TaskItem[] = [{
    title: "test",
    completed: false,
    expanded: false,
    subtasks: [
      {
        title: "test2",
        completed: false
      },
      {
        title: "test2",
        completed: false
      }
    ]
  },
  {
    title: "test",
    completed: false,
    expanded: false,
    subtasks: [
      {
        title: "test2",
        completed: false
      },
      {
        title: "test2",
        completed: false
      }
    ]
  }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  updateAllComplete() {
    //this.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
  }

  someComplete(task: TaskItem): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return task.subtasks.filter(t => t.completed).length > 0 && task.subtasks.filter(t => t.completed).length !== task.subtasks.length;
  }

  setAll(completed: boolean, task: TaskItem) {
    if (!task || task.subtasks.length === 0)
      return;

    task.subtasks.forEach(t => t.completed = completed);
  }

  onToggleExpandTask(task: TaskItem) {
    if (!task)
      return;

    task.expanded = !task.expanded;
  }

  allSubTasksIsCompleteted(task: TaskItem): boolean {
    if (!task || task.subtasks.length === 0)
      return false;

    return (task.subtasks.filter(t => t.completed).length === task.subtasks.length);
  }

}
