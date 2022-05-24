import { UpdateEffect } from './store/effects/update.effect';
import { EditEffect } from './store/effects/edit.effect';
import { DeleteUserEffect } from './store/effects/delete.effect';
import { GetUsersEffect } from './store/effects/get-users.effect';
import { NewEffect } from './store/effects/new.effect';
import { UserService } from './services/user.service';
import { UserNewDialogComponent } from './components/user-new-dialog/user-new-dialog.component';
import { MaterialModule } from './../material.module';

import { UserComponent } from './components/user/user.component';

import { AuthCenterGuard } from '@iss/ng-auth-center';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

import { EffectsModule } from '@ngrx/effects';
import { CreateEffect } from './store/effects/create.effect';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthCenterGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(
      [
        CreateEffect,
        NewEffect,
        GetUsersEffect,
        DeleteUserEffect,
        EditEffect,
        UpdateEffect
      ]
    ),
  ],
  declarations: [
    UserComponent,
    UserNewDialogComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
