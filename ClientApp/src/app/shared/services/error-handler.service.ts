import { ErrorHandler } from '@angular/core';

export class ErrorHandlerService extends ErrorHandler {

  handleError(error: any) {
    console.log(error);
    alert(error);
  }
}
