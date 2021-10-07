import * as AuthenticationActions from "./authentication.actions";


export interface State {
  token: string;
};

const initialState: State = {
  token: ""
}

export function authenticationReducer(state: State = initialState, action: AuthenticationActions.AuthenticationActions) {
  switch (action.type) {
    case AuthenticationActions.SET_TOKEN: {
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
