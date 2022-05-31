import { ErrorHandlerService } from '../../services/error-handler.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedEffect {
  constructor(
    private errorHandlerService: ErrorHandlerService
  ) {}

}
