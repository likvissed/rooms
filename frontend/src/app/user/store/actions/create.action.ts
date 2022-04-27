import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';
import { CreateRequestInterface } from '../../types/create-request.interface';

export const createUserAction = createAction(
  ActionTypes.CREATE,
  props<{ create: CreateRequestInterface }>()
);

export const createSuccessAction = createAction(
  ActionTypes.CREATE_SUCCESS,
  props<{result: any}>()
);

export const createFailureAction = createAction(
  ActionTypes.CREATE_FAILURE,
  props<{error: any}>()
);
