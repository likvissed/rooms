import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    console.error('handleError', error);

    switch (error.status) {
      case 422:
        console.log('Ошибки с сервера', error.error.message);

        break;
      case 403:
        console.log('Доступ запрещен');

        break;
      case 404:
        console.log('Данные не найдены');

        break;
      case 500:
        console.log('Сервер временно недоступен');

        break;
    }

  }
}
