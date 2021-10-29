import { AuthenticationActions, SET_TOKEN } from "./authentication.actions";


export interface State {
  token: string | null;
};

const initialState: State = {
  token: localStorage.getItem('token')
};

export function authenticationReducer(state: State = initialState, action: AuthenticationActions) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      }

      break;
    }

    default: {
      return state;

      break;
    }
  }
}
