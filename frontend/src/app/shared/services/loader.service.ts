import { showLoadingAction, hideLoadingAction } from '../store/shared.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(
    public store: Store
  ) {}

  show() {
    this.store.dispatch(showLoadingAction());
  }

  hide() {
    this.store.dispatch(hideLoadingAction());
  }
}
