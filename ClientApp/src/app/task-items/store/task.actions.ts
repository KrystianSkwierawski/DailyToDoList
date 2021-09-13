import { Action } from "@ngrx/store";
import { TaskItem } from "../task-item.model";

export const ADD = '[Task Items] Add Task Item';
export const ClEAR_ALL = '[Task Items] Clear All Task Items';
export const DELETE = '[Task Items] Delete Task Item';


export class AddTaskItem implements Action {
  readonly type = ADD;

  constructor(public payload: TaskItem) { }
}

export class ClearAllTasksItems implements Action {
  readonly type = ClEAR_ALL;
}

export class DeleteTaskItem implements Action {
  readonly type = DELETE;

  constructor(public payload: string) { }

}


export type TaskItemsActions = AddTaskItem | ClearAllTasksItems | DeleteTaskItem;
