import { allUsersSelector } from './../../store/selectors';
import { getUsersAction } from './../../store/actions/get-users.action';
import { Store, select } from '@ngrx/store';
import { GetUsersResponseInterface } from './../../types/get-user-response.interface';
import { UserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
// import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

// import { MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['number', 'tn', 'fio', 'role', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.initializeForm();
    this.initializeValues();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  initializeForm() {
  }

  initializeValues() {
    this.store.dispatch(getUsersAction());

    this.store.pipe(select(allUsersSelector))
      .subscribe((value: any) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;

      });
  }

  onCreateUser() {
    this.dialog.open(UserNewDialogComponent, {
      width: '700px',
      disableClose: true
    });
  }

}
