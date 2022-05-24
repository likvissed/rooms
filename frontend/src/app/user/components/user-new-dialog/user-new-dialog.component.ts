import { updateUserAction } from './../../store/actions/update.action';
import { UserInterface } from './../../types/user.interface';
import { NewRequestInterface } from './../../types/new-request.interface';
import { async } from '@angular/core/testing';
import { listRolesSelector, userObjectSelector } from './../../store/selectors';
import { newUserAction } from './../../store/actions/new.action';
import { BackendErrorsInterface } from './../../../shared/types/backend-errors.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store, select } from '@ngrx/store'
import { createUserAction } from '../../store/actions/create.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { map } from 'rxjs/operators';
import { Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editUserAction } from '../../store/actions/edit.action';

@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.scss']
})
export class UserNewDialogComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  roles$!: Observable<null | any>
  // user$!: Observable<UserInterface | null>
  // user!: UserInterface
  // roles$!: any[]

  constructor(
    public dialogRef: MatDialogRef<UserNewDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public user_id: number
  ) { }

  ngOnInit() {
    console.log('init', this.user_id);
    this.onInitializeValues();
    this.onInitializeFrom();
    this.onLoadData();
  }

  onInitializeFrom(): void {
    this.form = this.formBuilder.group({
      tn: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.pattern("^[0-9]*$")]),
      role_id: new FormControl(null, [Validators.required])
    })
  }

  onInitializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));

    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onLoadData() {
    if (this.user_id) {
      this.store.dispatch(editUserAction({id: this.user_id}));

      this.store.pipe(select(userObjectSelector))
        .subscribe((user: UserInterface) => {
          if (user) {
            this.form.controls['tn'].setValue(user.tn);
            this.form.controls['role_id'].setValue(user.role_id);
          }
        });


    } else {
      this.store.dispatch(newUserAction());
    }

    this.roles$ = this.store.pipe(select(listRolesSelector));
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    console.log('form', this.form.getRawValue());

    if (this.user_id) {
      this.store.dispatch(updateUserAction({id: this.user_id, user: this.form.getRawValue() }));
    } else {
      const request: NewRequestInterface = {
        new_user: this.form.value
      }

      this.store.dispatch(createUserAction(request));
    }


    // let err = this.store.pipe(select(validationErrorsSelector))
    // console.log('ERR', err);
    // this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    // alert(this.backendErrors$);
    this.dialogRef.close('success');
  }

}
