import { closeEditDialogUserAction, defaultEditDialogUserAction } from './../actions/open-edit-dialog.action';
import { openEditDialogUserAction } from './../actions/open-edit-dialog.action';

import { UserNewDialogComponent } from './../../components/user-new-dialog/user-new-dialog.component';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { map, mergeMap} from 'rxjs/operators';

@Injectable()
export class OpenEditDialogEffect {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog
  ) {}

  openDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openEditDialogUserAction),
      mergeMap((result: any) => {
        const dialogRef = this.dialog.open(UserNewDialogComponent, {
          width: '700px',
          disableClose: true,
          data: result.id
        });

        return dialogRef.afterClosed();
      }),
      map((result: string) => {
        if (result === undefined) {
          return closeEditDialogUserAction();
        }

        return defaultEditDialogUserAction();
      })
    )
  )

}
