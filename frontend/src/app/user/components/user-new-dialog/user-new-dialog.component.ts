import { BackendErrorsInterface } from './../../../shared/types/backend-errors.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Store, select } from '@ngrx/store'
import { createUserAction } from '../../store/actions/create.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';

@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.scss']
})
export class UserNewDialogComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(
    public dialogRef: MatDialogRef<UserNewDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit() {
    this.onInitializeFrom();
    // this.onLoad
    this.onInitializeValues();
  }

  onInitializeFrom(): void {
    this.form = this.formBuilder.group({
      tn: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.pattern("^[0-9]*$")])
      // role: new FormControl(null, [Validators.required, Validators.maxLength(11)]),
    })
  }

  onInitializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    // 0.12 = 04.21
    console.log('isSubmitting$', this.isSubmitting$);

    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    console.log('form', this.form);
    this.store.dispatch(createUserAction(this.form.value));
  }

}
