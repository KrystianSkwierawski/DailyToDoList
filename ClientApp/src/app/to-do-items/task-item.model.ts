import { SubtaskItem } from "./subtask-item.model";

export interface TaskItem {
  title: string;
  completed: boolean;
  expanded: boolean;
  subtasks: SubtaskItem[];
}
