import { UserInterface } from './../../types/user.interface';
import { getUsersAction } from './../actions/get-users.action';
import { updateUserSuccessAction, updateUserFailureAction, updateUserAction } from './../actions/update.action';

import { UserService } from './../../services/user.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UpdateEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserAction),
      switchMap(({ data }) => {
        console.log('UP', data);

        return this.userService.update(data).pipe(
          map((result: any) => {
            console.log('update user Success:', result);

            alert(result.message);
            this.dialog.closeAll();
          }),
          switchMap((result: any) => [
            updateUserSuccessAction({result}),
            getUsersAction()
          ]),

          catchError((errorResponse: HttpErrorResponse) => of(
            updateUserFailureAction({error: errorResponse.error.message})
          ))
        )
      })
    )
  );
}
