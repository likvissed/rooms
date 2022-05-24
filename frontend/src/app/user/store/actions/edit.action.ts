import { EditResponseInterface } from './../../types/edit-response.interface';

import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const editUserAction = createAction(
  ActionTypes.EDIT_USER,
  props<{ id: number }>()
);

export const editUserSuccessAction = createAction(
  ActionTypes.EDIT_USER_SUCCESS,
  props<{ result: EditResponseInterface }>()
);

export const editUserFailureAction = createAction(
  ActionTypes.EDIT_USER_FAILURE,
  props<{ error: any }>()
);
