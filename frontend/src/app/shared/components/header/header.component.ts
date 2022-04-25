import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  isAuthenticated = false;
  fio_initials = '';
  role_user = '';

  constructor(
    private authHelper: AuthHelper
  ) { }

  ngOnInit(): void {
    this.authHelper.isAuthenticated$.subscribe(isAuth => {
      console.log(isAuth);
      this.isAuthenticated = isAuth;

      if (isAuth) {
        this.fio_initials = this.authHelper.getJwtPayload()['fio_initials'];
        this.role_user = this.authHelper.getJwtPayload()['role'];
      }
    });
  }

  logout() {
    this.authHelper.logout();
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
