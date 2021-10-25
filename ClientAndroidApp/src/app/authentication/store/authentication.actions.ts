import { Action } from "@ngrx/store";


export const SET_TOKEN = '[Authentication] Set Token';

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) { }
}

export type AuthenticationActions = SetToken;
