import { isLoadingSelector } from './../../store/shared.selector';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isLoading$!: Observable<boolean>

  isAuthenticated = false;
  fio_initials = '';
  role_user = '';

  constructor(
    private authHelper: AuthHelper,
    private store: Store,
    private cdr: ChangeDetectorRef
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

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
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
