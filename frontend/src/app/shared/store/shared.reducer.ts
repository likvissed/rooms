import { setErrorMessageAction, showLoadingAction, hideLoadingAction } from './shared.action';
import { SharedStateInterface } from './../types/shared-state.interface';
import { Action, createReducer, on } from "@ngrx/store"

const initialState: any = {
  errorMsg: '',
  isLoading: false
}

const sharedReducer = createReducer(
  initialState,

  on(setErrorMessageAction, (state, action): SharedStateInterface => ({
    ...state,
    errorMsg: action.message
  })),

  on(showLoadingAction, (state, action): SharedStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(hideLoadingAction, (state, action): SharedStateInterface => ({
    ...state,
    isLoading: false
  }))
)

export function reducers(state: SharedStateInterface, action: Action) {
  return sharedReducer(state, action);
}
