import { TaskItem } from "../task-item.model";
import * as TaskActions from './task.actions';


export interface State {
  taskItems: TaskItem[];
  animationIsRunning: boolean;
}

const initialState: State = {
  taskItems: [],
  animationIsRunning: false
};

export function toDoReducer(state: State = initialState, action: TaskActions.TaskItemsActions) {
  switch (action.type) {
    case TaskActions.ADD: {
      return {
        ...state,
        taskItems: [action.payload, ...state.taskItems]
      };

      break;
    }

    case TaskActions.UPDATE_TASK_ITEMS: {
      return {
        ...state,
        taskItems: action.payload
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

    case TaskActions.TOGGLE_ANIMATION: {
      return {
        ...state,
        animationIsRunning: action.payload
      }

      break;
    }

    default: {
      return state;

      break;
    }
  }
}
