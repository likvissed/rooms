import { setErrorMessageAction } from './shared.action';
import { SharedStateInterface } from './../types/shared-state.interface';
import { Action, createReducer, on } from "@ngrx/store"

const initialState: any = {
  errorMsg: ''
}

const sharedReducer = createReducer(
  initialState,

  on(setErrorMessageAction, (state, action): SharedStateInterface => ({
    ...state,
    errorMsg: action.message
  }))
)

export function reducers(state: SharedStateInterface, action: Action) {
  return sharedReducer(state, action);
}
