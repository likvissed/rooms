import { getUsersAction, getUsersSuccessAction, getUsersailureAction } from './actions/get-users.action';
import { newUserAction, newSuccessAction, newFailureAction } from './actions/new.action';
import { UserStateInterface } from './../types/user-state.interface';
import { Action, createReducer, on } from "@ngrx/store"
import { createFailureAction, createSuccessAction, createUserAction } from "./actions/create.action";

const  initialState:  any = {
  isSubmitting: false,
  validationsErrors: null,
  roles: null, //as any
  response: null,
  users: null
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
  on(getUsersailureAction, (state, action): any => ({
    ...state,
    validationsErrors: action.error,
  }))
)

export function reducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
