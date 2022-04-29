import { newUserAction, newSuccessAction, newFailureAction } from './../actions/new.action';
import { UserService } from './../../services/user.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class NewEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    // private persistanceService: PersistanceService,
    // private router: Router
  ) {}

  new$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newUserAction),
      switchMap(() => {
        return this.userService.new().pipe(
          map((result: any) => {
            return newSuccessAction({result});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(newFailureAction({error: errorResponse}))
          })
        )
      })
    )
  );
}
