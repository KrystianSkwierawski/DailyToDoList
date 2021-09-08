export interface TaskItem {
  title: string;
  completed: boolean;
  expanded: boolean;
  subtasks: TaskItem[];
}
