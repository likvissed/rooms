import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const newUserAction = createAction(
  ActionTypes.NEW
  // props<{ roles: any}>()
);

export const newSuccessAction = createAction(
  ActionTypes.NEW_SUCCESS,
  props<{result: any}>()
);

export const newFailureAction = createAction(
  ActionTypes.NEW_FAILURE,
  props<{error: any}>()
);
