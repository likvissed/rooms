import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

@Component({
  selector: 'app-room-index',
  templateUrl: './room-index.component.html',
  styleUrls: ['./room-index.component.scss']
})
export class RoomIndexComponent implements OnInit {

  constructor(
    private authHelper: AuthHelper
  ) { }

  ngOnInit(): void {
    console.log('JWT:', this.authHelper.getJwtPayload());
  }

}
