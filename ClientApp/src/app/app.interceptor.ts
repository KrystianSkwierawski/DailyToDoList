import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { AppState } from './store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor, OnDestroy {

  token: string | undefined;
  storeSub: Subscription;

  constructor(private store: Store<AppState>) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.storeSub = this.store.select('authentication').subscribe(authenticationState => {
      this.token = authenticationState.token;
    });

    if (this.token) {
      request = request.clone({
        setHeaders: {
          Token: this.token
        }
      });
    }

    return next.handle(request).pipe(catchError((errorResponse: HttpErrorResponse) => {
      const error = errorResponse.statusText ?? 'An unknown error occurred!';

      alert(error);

      return throwError(error);
    }));
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
