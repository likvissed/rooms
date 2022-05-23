import { getUsersAction, getUsersSuccessAction, getUsersFailureAction } from './../actions/get-users.action';

import { UserService } from './../../services/user.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class GetUsersEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersAction),
      switchMap(() => {
        return this.userService.getUsers().pipe(
          map((result: any) => {
            console.log('get users Success:', result);
            return getUsersSuccessAction({result});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('get users catchError:', errorResponse.error.message);
            return of(getUsersFailureAction({error: errorResponse}))
          })
        )
      })
    )
  );
}
