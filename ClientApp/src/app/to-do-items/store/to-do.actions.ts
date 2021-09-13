import { Action } from "@ngrx/store";
import { TaskItem } from "../task-item.model";

export const ADD = '[To Do Items] Add To Do Item';
export const ClEAR_ALL = '[To Do Items] Clear All';


export class AddToDoItem implements Action {
  readonly type = ADD;

  constructor(public payload: TaskItem) { }
}

export class ClearAllToDoItems implements Action {
  readonly type = ClEAR_ALL;
}


export type ToDoItemsActions = AddToDoItem | ClearAllToDoItems;
