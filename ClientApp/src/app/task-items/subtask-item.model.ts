export class SubtaskItem {
  title: string;
  completed: boolean;
  color: string;

  constructor(title: string, color = "#DEF2FF", completed = false) {
    this.title = title;
    this.completed = completed;
    this.color = color;
  }
}

