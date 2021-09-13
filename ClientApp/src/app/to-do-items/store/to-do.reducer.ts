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
    case ToDoActions.ADD: {
      return {
        ...state,
        toDoItems: [...state.toDoItems, action.payload]
      };

      break;
    }

    case ToDoActions.ClEAR_ALL: {
      return {
        ...state,
        toDoItems: []
      }

      break;
    }

    default: {
      return state;

      break;
    }
  }
}
