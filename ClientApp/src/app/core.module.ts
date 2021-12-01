import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppInterceptor } from './app.interceptor';
import { ErrorHandlerService } from './shared/services/error-handler.service';


@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ]
})
export class CoreModule { }
