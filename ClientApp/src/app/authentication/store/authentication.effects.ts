import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { tap } from 'rxjs/operators';
import { SetTokenInLocalStorage, SET_TOKEN_IN_LOCAL_STORAGE } from "./authentication.actions";

@Injectable()
export class AuthenticationEffects {

  @Effect({ dispatch: false })
  setTokenInLocalStorage$ = this.actions$.pipe(
    ofType(SET_TOKEN_IN_LOCAL_STORAGE),
    tap((action: SetTokenInLocalStorage) => {
      if (action.payload) {
        localStorage.setItem('token', action.payload);

        return;
      }

      if (!action.payload) {
        localStorage.removeItem('token');
        window.location.reload();

        return;
      }
    })
  );

  constructor(
    private actions$: Actions,
  ) { }
}
