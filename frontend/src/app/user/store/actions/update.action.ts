import { UpdateRequestInterface } from './../../types/update-request.interface';

import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ data: UpdateRequestInterface}>()
);

export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ result: any }>()
);

export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE,
  props<{ error: any }>()
);
