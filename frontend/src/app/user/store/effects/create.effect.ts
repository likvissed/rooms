import { closeEditDialogUserAction } from './../actions/open-edit-dialog.action';
import { UserNewDialogComponent } from './../../components/user-new-dialog/user-new-dialog.component';
import { getUsersAction } from './../actions/get-users.action';
import { createSuccessAction, createFailureAction } from './../actions/create.action';
import { UserService } from './../../services/user.service';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

import { createUserAction } from '../actions/create.action';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
// import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class CreateEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private dialog: MatDialog
    // private dialogRef: MatDialogRef<UserNewDialogComponent>,
    // private persistanceService: PersistanceService,
    // private router: Router
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap(({ user }) => { // { new_user }
        return this.userService.create(user).pipe(
          map((result: any) => {
            console.log('create user Success:', result);

            this.dialog.closeAll();
            alert(result.message);
          }),
          switchMap((result: any) => [
            createSuccessAction({result}),
            getUsersAction()
          ]),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('catchError', errorResponse)
            alert(errorResponse.error.message);

            return of(createFailureAction({error: errorResponse.error.message}))
          })
        )
      })
    )
  );
}
