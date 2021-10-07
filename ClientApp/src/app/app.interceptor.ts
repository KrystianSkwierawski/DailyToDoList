import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor, OnInit, OnDestroy {

  token: string | undefined;
  storeSub: Subscription;


  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    //this.store.select('authentication').subscribe(authenticationState => {
    //  console.log(authenticationState);
    //  this.token = authenticationState.token;
    //});
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.store.select('authentication').subscribe(authenticationState => {
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
