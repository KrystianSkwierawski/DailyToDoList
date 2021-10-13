import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { AppState } from './store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor, OnDestroy {

  token: string | undefined;
  storeSub: Subscription;

  constructor(private store: Store<AppState>, private logger: NGXLogger) { }


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

    this.logger.info(request);

    return next.handle(request).pipe(
      tap(response => {
        this.logger.info(response);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        const error = errorResponse.statusText ?? 'An unknown error occurred!';

        alert(error);

        this.logger.error(error);

        return throwError(error);
    }));
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
