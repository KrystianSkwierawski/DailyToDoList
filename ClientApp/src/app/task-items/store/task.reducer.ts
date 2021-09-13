import { TaskItem } from "../task-item.model";
import * as TaskActions from './task.actions';


export interface State {
  taskItems: TaskItem[];
}

const initialState: State = {
  taskItems: []
};

export function toDoReducer(state: State = initialState, action: TaskActions.TaskItemsActions) {
  switch (action.type) {
    case TaskActions.ADD: {
      return {
        ...state,
        taskItems: [...state.taskItems, action.payload]
      };

      break;
    }

    case TaskActions.ClEAR_ALL: {
      return {
        ...state,
        taskItems: []
      }

      break;
    }

    case TaskActions.DELETE: {
      const updatedTaskItems = [...state.taskItems].filter(t => t.id !== action.payload)

      return {
        ...state,
        taskItems: updatedTaskItems
      }

      break;
    }

    default: {
      return state;

      break;
    }
  }
}
