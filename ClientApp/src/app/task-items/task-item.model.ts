import { SubtaskItem } from "./subtask-item.model";


export interface TaskItem {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  expanded: boolean;
  editing: boolean;
  subtasks: SubtaskItem[];
}
