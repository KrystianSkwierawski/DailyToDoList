import { ActionReducerMap } from "@ngrx/store";
import * as fromTasks from '../task-items/store/task.reducer';

export interface AppState {
  taskItems: fromTasks.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  taskItems: fromTasks.toDoReducer
};
