import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //request = request.clone({
    //  setHeaders: {
    //    Authorization: token
    //  }
    //});

    return next.handle(request).pipe(catchError((errorResponse: HttpErrorResponse) => {
      const error = errorResponse.statusText ?? 'An unknown error occurred!';

      alert(error);

      return throwError(error);
    }));
  }
}
