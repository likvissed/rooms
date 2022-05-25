import { getUsersSuccessAction, getUsersFailureAction, getUsersAction } from './../actions/get-users.action';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType, concatLatestFrom } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { deleteUserFailureAction, deleteUserSuccessAction, deleteUserAction } from '../actions/delete.action';

@Injectable()
export class DeleteUserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(({id}) => {
        return this.userService.delete(id).pipe(
          map((result: any) => {
            console.log('delete user Success:', result);
            alert(result.message);
          }),
          switchMap((result: any) => [
            deleteUserSuccessAction({result}),
            getUsersAction()
          ]),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('delete user catchError:', errorResponse.error.message);

            alert(errorResponse.error.message);
            return of(deleteUserFailureAction({error: errorResponse}))
          })
        )
      })
    )
  );
}
