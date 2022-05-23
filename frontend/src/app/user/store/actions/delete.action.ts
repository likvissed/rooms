import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const deleteUserAction = createAction(
  ActionTypes.DELETE_USER,
  props<{id: number }>()
);

export const deleteUserSuccessAction = createAction(
  ActionTypes.DELETE_USER_SUCCESS,
  props<{result: any}>()
);

export const deleteUserFailureAction = createAction(
  ActionTypes.DELETE_USER_FAILURE,
  props<{error: any}>()
);
