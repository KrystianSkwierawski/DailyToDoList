import { Action } from "@ngrx/store";
import { TaskItem } from "../task-item.model";

export const ADD_TO_DO_ITEM = '[To Do Items] Add To Do Item';

export class AddToDoItem implements Action {
  readonly type = ADD_TO_DO_ITEM;

  constructor(public payload: TaskItem) { }
}

export type ToDoItemsActions = AddToDoItem;
