import { ActionReducerMap } from "@ngrx/store";
import * as fromToDoItems from '../to-do-items/store/to-do.reducer';

export interface AppState {
  toDoItems: fromToDoItems.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  toDoItems: fromToDoItems.toDoReducer
};
