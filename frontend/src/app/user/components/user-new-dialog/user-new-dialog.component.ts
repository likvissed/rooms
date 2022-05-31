import { NewRequestInterface } from './../../types/new-request.interface';
import { UpdateRequestInterface } from './../../types/update-request.interface';
import { updateUserAction } from './../../store/actions/update.action';
import { UserInterface } from './../../types/user.interface';
import { async } from '@angular/core/testing';
import { listRolesSelector, userObjectSelector } from './../../store/selectors';
import { newUserAction } from './../../store/actions/new.action';
import { BackendErrorsInterface } from './../../../shared/types/backend-errors.interface';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
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
export class UserNewDialogComponent implements OnInit, AfterViewChecked {
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
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public user_id: number
  ) { }

  ngOnInit() {
    console.log('init', this.user_id);
    this.onInitializeValues();
    this.onInitializeFrom();
    this.onLoadData();
  }

  ngAfterViewChecked() {
    // this.cdr.detectChanges();
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
    console.log('form 1', this.form.getRawValue());
    console.log('form 2', this.form.value);

    if (this.user_id) {
      const request: UpdateRequestInterface = {
        id: this.user_id,
        user: this.form.getRawValue()
      }

      this.store.dispatch(updateUserAction({data: request}));
    } else {
      const request: NewRequestInterface = {
        user: this.form.getRawValue()
      }

      this.store.dispatch(createUserAction(request));
    }
  }

}
