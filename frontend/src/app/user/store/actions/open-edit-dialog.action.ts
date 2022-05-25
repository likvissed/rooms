import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types';

export const openEditDialogUserAction = createAction(
  ActionTypes.OPEN_EDIT_DIALOG,
  props<{ id: any }>()
);

export const closeEditDialogUserAction = createAction(
  ActionTypes.CLOSE_EDIT_DIALOG
);

export const defaultEditDialogUserAction = createAction(
  ActionTypes.DEFAULT_EDIT_DIALOG
);

