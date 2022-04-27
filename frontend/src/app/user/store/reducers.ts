import { UserStateInterface } from './../types/user-state.interface';
import { Action, createReducer, on } from "@ngrx/store"
import { createFailureAction, createSuccessAction, createUserAction } from "./actions/create.action";

const  initialState:  UserStateInterface = {
  isSubmitting: false,
  validationsErrors: null
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
    validationsErrors: action.result
  })),
  on(createFailureAction, (state, action): UserStateInterface => ({
    ...state,
    isSubmitting: false,
    validationsErrors: action.error
  }))
)

export function reducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
