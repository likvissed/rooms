import { editUserAction, editUserFailureAction, editUserSuccessAction } from './actions/edit.action';
import { updateUserAction, updateUserFailureAction, updateUserSuccessAction } from './actions/update.action';
import { getUsersAction, getUsersSuccessAction, getUsersFailureAction } from './actions/get-users.action';
import { newUserAction, newSuccessAction, newFailureAction } from './actions/new.action';
import { UserStateInterface } from './../types/user-state.interface';
import { Action, createReducer, on } from "@ngrx/store"
import { createFailureAction, createSuccessAction, createUserAction } from "./actions/create.action";
import { deleteUserAction, deleteUserFailureAction, deleteUserSuccessAction } from './actions/delete.action';

const initialState: any = {
  isSubmitting: false,
  validationsErrors: null,
  roles: null, //as any
  response: null,
  users: null,
  error: ''
}

const userReducer = createReducer(
  initialState,

  on(createUserAction, (state): UserStateInterface => ({
    ...state,
    isSubmitting: true,
    validationsErrors: null // Удалить ошибки перед новой отправкой на сервер
  })),
  on(createSuccessAction, (state, action): UserStateInterface => ({
    ...state,
    isSubmitting: false,
    response: action.result
  })),
  on(createFailureAction, (state, action): UserStateInterface => ({
    ...state,
    isSubmitting: false,
    validationsErrors: action.error
  })),


  on(newUserAction, (state): any => ({
    ...state,
    roles: null
  })),
  on(newSuccessAction, (state, action): any => ({
    ...state,
    roles: action.result
  })),
  on(newFailureAction, (state, action): any => ({
    ...state,
    validationsErrors: action.error,
    roles: null
  })),

  on(getUsersAction, (state): any => ({
    ...state
  })),
  on(getUsersSuccessAction, (state, action): any => ({
    ...state,
    users: action.result
  })),
  on(getUsersFailureAction, (state, action): any => ({
    ...state,
    validationsErrors: action.error,
  })),

  on(deleteUserAction, (state): any => ({
    ...state
  })),
  on(deleteUserSuccessAction, (state, action): any => ({
    ...state,
    response: action.result
  })),
  on(deleteUserFailureAction, (state, action): any => ({
    ...state,
    validationsErrors: action.error,
  })),

  on(editUserAction, (state): any => ({
    ...state
  })),
  on(editUserSuccessAction, (state, action): any => ({
    ...state,
    // response: action.result,
    user: action.result.user,
    roles: action.result.roles
  })),
  on(editUserFailureAction, (state, action): any => ({
    ...state,
    validationsErrors: action.error
  })),

  on(updateUserAction, (state): any => ({
    ...state
  })),
  on(updateUserSuccessAction, (state, action): any => ({
    ...state,
    // response: action.result
  })),
  on(updateUserFailureAction, (state, action): any => ({
    ...state,
    validationsErrors: action.error
  }))
)

export function reducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
