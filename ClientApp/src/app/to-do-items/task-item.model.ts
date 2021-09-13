import { SubtaskItem } from "./subtask-item.model";


export class TaskItem {
  title: string;
  color: string;
  completed: boolean;
  expanded: boolean;
  subtasks: SubtaskItem[];

  constructor(title: string, color = "#6264A7", completed = false, expanted = false, subtasks = []) {
    this.title = title;
    this.completed = completed;
    this.expanded = expanted;
    this.subtasks = subtasks;
    this.color = color;
  }
}
