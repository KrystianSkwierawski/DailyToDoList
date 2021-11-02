import { Action } from "@ngrx/store";


export const SET_TOKEN = '[Authentication] Set Token';
export const SET_TOKEN_IN_LOCAL_STORAGE = '[Authentication] Set Token In Local Storage';


export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string | null) { }
}

export class SetTokenInLocalStorage implements Action {
  readonly type = SET_TOKEN_IN_LOCAL_STORAGE;

  constructor(public payload: string | null) { }
}

export type AuthenticationActions = SetToken | SetTokenInLocalStorage;
