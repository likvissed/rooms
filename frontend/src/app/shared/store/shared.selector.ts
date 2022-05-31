import { createSelector } from '@ngrx/store';
import { SharedStateInterface } from './../types/shared-state.interface';
import { createFeatureSelector } from '@ngrx/store';


const getSharedState = createFeatureSelector<SharedStateInterface>('shared');

export const getErrorMessage = createSelector(
  getSharedState,
  (state: SharedStateInterface) => state.errorMsg
)
