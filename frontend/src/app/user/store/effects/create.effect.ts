import { createSuccessAction, createFailureAction } from './../actions/create.action';
import { UserService } from './../../services/user.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createUserAction } from '../actions/create.action';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class CreateEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    // private persistanceService: PersistanceService,
    // private router: Router
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap(({new_user}) => { // { new_user }
        return this.userService.create(new_user).pipe(
          map((result: any) => {
            console.log('RES', result);
            return createSuccessAction({result});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            console.log('catchError', errorResponse.error.message)
            alert(errorResponse.error.message);
            return of(createFailureAction({error: errorResponse.error.message}))
          })
        )
      })
    )
  );
}
