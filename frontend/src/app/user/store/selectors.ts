import { UserStateInterface } from './../types/user-state.interface';
import { AppStateInterface } from './../../shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from "@ngrx/store";

// AppStateInterface - глобальный стейт
// UserStateInterface - локальный стейт под `user`
export const userFeatureSelector = createFeatureSelector<
  // AppStateInterface,
  UserStateInterface
>('user')


export const isSubmittingSelector = createSelector(
  userFeatureSelector,
  (userState: UserStateInterface) => userState.isSubmitting
)

// Для отображения ошибок
export const validationErrorsSelector = createSelector(
  userFeatureSelector,
  (userState: UserStateInterface) => userState.validationsErrors
)
