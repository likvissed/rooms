import { SharedActionTypes } from './shared-action-types';
import { createAction, props } from '@ngrx/store';

export const setErrorMessageAction = createAction(
  SharedActionTypes.SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const showLoadingAction = createAction(
  SharedActionTypes.SHOW_LOADING
);

export const hideLoadingAction = createAction(
  SharedActionTypes.HIDE_LOADING
);

