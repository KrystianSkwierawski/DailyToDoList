import { ActionReducerMap } from "@ngrx/store";
import * as fromTasks from '../task-items/store/task.reducer';
import * as fromAuthentication from '../authentication/store/authentication.reducer';


export interface AppState {
  taskItems?: fromTasks.State;
  authentication: fromAuthentication.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  taskItems: fromTasks.toDoReducer,
  authentication: fromAuthentication.authenticationReducer
};
