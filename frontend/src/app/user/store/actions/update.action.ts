import { UserInterface } from './../../types/user.interface';

import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { CreateRequestInterface } from '../../types/create-request.interface';

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{id: number, user: CreateRequestInterface}>()
);

export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ result: any }>()
);

export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE,
  props<{ error: any }>()
);
