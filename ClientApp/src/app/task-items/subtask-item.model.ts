export class SubtaskItem {
  title: string;
  completed: boolean;
  color: string;

  constructor(title: string, color = "#6264A7", completed = false) {
    this.title = title;
    this.completed = completed;
    this.color = color;
  }
}

