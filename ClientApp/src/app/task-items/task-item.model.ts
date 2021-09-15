import { SubtaskItem } from "./subtask-item.model";


export class TaskItem {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  expanded: boolean;
  subtasks: SubtaskItem[];

  constructor(id: string, title: string, color = "#DEF2FF", completed = false, expanted = false, subtasks = []) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.expanded = expanted;
    this.subtasks = subtasks;
    this.color = color;
  }
}
