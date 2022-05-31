import { ErrorHandlerService } from './../services/error-handler.service';
import { setErrorMessageAction } from './../store/shared.action';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private errorHandlerService: ErrorHandlerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorHandlerService.handleError(error);

          this.store.dispatch(setErrorMessageAction(error));
          return throwError(error);
        })
      )

  }
}
