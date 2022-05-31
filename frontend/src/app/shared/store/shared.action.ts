import { SharedActionTypes } from './shared-action-types';
import { createAction, props } from '@ngrx/store';


export const setErrorMessageAction = createAction(
  SharedActionTypes.SET_ERROR_MESSAGE,
  props<{ message: string }>()
);
