import { TaskItem } from "../task-item.model";
import * as TaskActions from './task.actions';


export interface State {
  taskItems: TaskItem[] | undefined;
}

const initialState: State = {
  taskItems: undefined,
};

export function toDoReducer(state: State = initialState, action: TaskActions.TaskItemsActions) {
  switch (action.type) {
    case TaskActions.ADD_TASK_ITEM_LOCALLY: {
      if (!state.taskItems)
        return;

      return {
        ...state,
        taskItems: [action.payload, ...state.taskItems]
      };

      break;
    }

    case TaskActions.UPDATE_TASK_ITEM_LOCALLY: {
      if (!state.taskItems)
        return;

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
      return {
        ...state,
        taskItems: action.payload
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
      if (!state.taskItems)
        return;

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
