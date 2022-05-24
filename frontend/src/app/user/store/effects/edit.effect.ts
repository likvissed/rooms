import { EditResponseInterface } from './../../types/edit-response.interface';
import { editUserAction, editUserSuccessAction, editUserFailureAction } from './../actions/edit.action';

import { UserService } from './../../services/user.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class EditEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserAction),
      switchMap(({id}) => {
        return this.userService.edit(id).pipe(
          map((result: EditResponseInterface) => {
            console.log('edit user Success:', result);

            return editUserSuccessAction({result})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('edit user catchError', errorResponse.error.message)
            alert(errorResponse.error.message);
            return of(editUserFailureAction({error: errorResponse.error.message}))
          })
        )
      })
    )
  );
}
