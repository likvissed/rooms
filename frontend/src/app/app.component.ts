import { ErrorHandlerService } from './shared/services/error-handler.service';
import { getErrorMessage } from './shared/store/shared.selector';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  errorMsg$!: Observable<string>;

  constructor (
    private store: Store,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.errorMsg$ = this.store.select(getErrorMessage);
  }
}
