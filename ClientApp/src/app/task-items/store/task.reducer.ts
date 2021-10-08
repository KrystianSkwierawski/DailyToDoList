import { TaskItem } from "../task-item.model";
import * as TaskActions from './task.actions';


export interface State {
  taskItems: TaskItem[];
  apiReturnedInitialData: boolean;
}

const initialState: State = {
  taskItems: [],
  apiReturnedInitialData: false
};

export function toDoReducer(state: State = initialState, action: TaskActions.TaskItemsActions) {
  switch (action.type) {
    case TaskActions.ADD_TASK_ITEM_LOCALLY: {
      return {
        ...state,
        taskItems: [action.payload, ...state.taskItems]
      };

      break;
    }

    case TaskActions.UPDATE_TASK_ITEM_LOCALLY: {
      const updatedTaskItems = [...state.taskItems];

      const index = updatedTaskItems.findIndex((obj => obj.id === action.payload.id));

      updatedTaskItems[index] = action.payload;

      return {
        ...state,
        taskItems: updatedTaskItems
      };

      break;
    }

    case TaskActions.UPDATE_TASK_ITEMS_LOCALLY: {

      // It helps to check if ought to show progress spinner.
      const apiReturnedInitialData = !state.apiReturnedInitialData ? true : false;

      return {
        ...state,
        apiReturnedInitialData,
        taskItems: action.payload,
      };

      break;
    }

    case TaskActions.ClEAR_ALL_LOCALLY: {
      return {
        ...state,
        taskItems: []
      }

      break;
    }

    case TaskActions.DELETE_LOCALLY: {
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
