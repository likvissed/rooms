import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomIndexComponent } from './components/room-index/room-index.component';

import { AuthCenterGuard } from '@iss/ng-auth-center';

const routes: Routes = [
  {
    path: 'rooms',
    pathMatch: 'full',
    component: RoomIndexComponent,
    canActivate: [AuthCenterGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RoomIndexComponent
  ]
})
export class RoomModule { }
