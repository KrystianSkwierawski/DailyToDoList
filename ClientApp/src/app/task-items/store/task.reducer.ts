import { TaskItem } from "../task-item.model";
import { ADD_TASK_ITEM_LOCALLY, ClEAR_ALL_TASK_ITEMS_LOCALLY, DELETE_TASK_ITEM_LOCALLY, TaskItemsActions, UPDATE_TASK_ITEMS_LOCALLY, UPDATE_TASK_ITEM_LOCALLY } from "./task.actions";


export interface State {
  taskItems: TaskItem[];
  initializedData: boolean;
}

const initialState: State = {
  taskItems: [],
  initializedData: false
};

export function toDoReducer(state: State = initialState, action: TaskItemsActions) {
  switch (action.type) {
    case ADD_TASK_ITEM_LOCALLY: {
      return {
        ...state,
        taskItems: [action.payload, ...state.taskItems]
      };

      break;
    }

    case UPDATE_TASK_ITEM_LOCALLY: {
      const updatedTaskItems = [...state.taskItems];

      const index = updatedTaskItems.findIndex((obj => obj.id === action.payload.id));

      updatedTaskItems[index] = action.payload;

      return {
        ...state,
        taskItems: updatedTaskItems
      };

      break;
    }

    case UPDATE_TASK_ITEMS_LOCALLY: {
      return {
        ...state,
        initializedData: true,   // It helps to check if ought to show progress spinner.
        taskItems: action.payload,
      };

      break;
    }

    case ClEAR_ALL_TASK_ITEMS_LOCALLY: {
      return {
        ...state,
        taskItems: []
      }

      break;
    }

    case DELETE_TASK_ITEM_LOCALLY: {
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
