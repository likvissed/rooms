import { createAction, props } from '@ngrx/store';
import { ActionTypes } from "../action-types";

export const getUsersAction = createAction(
  ActionTypes.GET_USERS
  // props<{ users: any }>()
);

export const getUsersSuccessAction = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{result: any}>()
);

export const getUsersFailureAction = createAction(
  ActionTypes.GET_USERS_FAILURE,
  props<{error: any}>()
);
