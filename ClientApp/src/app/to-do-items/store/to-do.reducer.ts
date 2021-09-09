import { TaskItem } from "../task-item.model";
import * as ToDoActions from './to-do.actions';


export interface State {
  toDoItems: TaskItem[];
}

const initialState: State = {
  toDoItems: []
};

export function toDoReducer(state: State = initialState, action: ToDoActions.ToDoItemsActions) {
  switch (action.type) {
    case ToDoActions.ADD_TO_DO_ITEM: {
      return {
        ...state,
        toDoItems: [...state.toDoItems, action.payload]
      };

      break;
    }

    default: {
      return state;

      break;
    }
  }
}
