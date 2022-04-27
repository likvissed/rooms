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
      switchMap(({ create }) => {
        return this.userService.create(create).pipe(
          map((result: any) => {
            return createSuccessAction({result});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(createFailureAction({error: errorResponse}))
          })
        )
      })
    )
  );
}
