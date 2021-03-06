import { Action } from "@ngrx/store";
import { TaskItem } from "../task-item.model";

export const GET_TASK_ITEMS = '[Task Items] Get Task Items';
export const ADD_TASK_ITEM_LOCALLY = '[Task Items] Add Task Item Locally';
export const ADD_TASK_ITEM_REMOTELY = '[Task Items] Add Task Item Remotely';
export const UPDATE_TASK_ITEM_LOCALLY = '[Task Items] Update Task Item Locally';
export const UPDATE_TASK_ITEM_REMOTELY = '[Task Items] Update Task Item REMOTELY';
export const UPDATE_TASK_ITEMS_LOCALLY = '[Task Items] Update Task Items Locally';
export const UPDATE_TASK_ITEMS_REMOTELY = '[Task Items] Update Task Items REMOTELY';
export const ClEAR_ALL_TASK_ITEMS_LOCALLY = '[Task Items] Clear All Task Items Locally';
export const ClEAR_ALL_TASK_ITEMS_REMOTELY = '[Task Items] Clear All Task Items Remotely';
export const DELETE_TASK_ITEM_LOCALLY = '[Task Items] Delete Task Item Locally';
export const DELETE_TASK_ITEM_REMOTELY = '[Task Items] Delete Task Item Remotely';
export const STOP_EDITING_ALL_ITEMS = '[Task Items] Stop Editing All Items';



export class GetTaskItems implements Action {
  readonly type = GET_TASK_ITEMS;
}

export class AddTaskItemRemotely implements Action {
  readonly type = ADD_TASK_ITEM_REMOTELY;

  constructor(public payload: { title: string, color: string }) { }
}

export class AddTaskItemLocally implements Action {
  readonly type = ADD_TASK_ITEM_LOCALLY;

  constructor(public payload: TaskItem) { }
}

export class UpdateTaskItemRemotely implements Action {
  readonly type = UPDATE_TASK_ITEM_REMOTELY;

  constructor(public payload: TaskItem) { }
}

export class UpdateTaskItemLocally implements Action {
  readonly type = UPDATE_TASK_ITEM_LOCALLY;

  constructor(public payload: TaskItem) { }
}

export class UpdateTaskItemsLocally implements Action {
  readonly type = UPDATE_TASK_ITEMS_LOCALLY;

  constructor(public payload: TaskItem[]) { }
}


export class UpdateTaskItemsRemotely implements Action {
  readonly type = UPDATE_TASK_ITEMS_REMOTELY;

  constructor(public payload: TaskItem[]) { }
}

export class ClearAllTasksItemsLocally implements Action {
  readonly type = ClEAR_ALL_TASK_ITEMS_LOCALLY;
}

export class ClearAllTasksItemsRemotely implements Action {
  readonly type = ClEAR_ALL_TASK_ITEMS_REMOTELY;
}

export class DeleteTaskItemLocally implements Action {
  readonly type = DELETE_TASK_ITEM_LOCALLY;

  constructor(public payload: string) { }
}

export class DeleteTaskItemRemotely implements Action {
  readonly type = DELETE_TASK_ITEM_REMOTELY;

  constructor(public payload: string) { }
}

export class StopEditingAllItems implements Action {
  readonly type = STOP_EDITING_ALL_ITEMS;

  constructor() { }
}

export type TaskItemsActions =
  AddTaskItemLocally |
  ClearAllTasksItemsLocally |
  DeleteTaskItemLocally |
  UpdateTaskItemLocally |
  UpdateTaskItemsLocally |
  DeleteTaskItemRemotely |
  StopEditingAllItems;
