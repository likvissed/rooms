import { openEditDialogUserAction } from './../../store/actions/open-edit-dialog.action';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { allUsersSelector, isSubmittingSelector } from './../../store/selectors';
import { getUsersAction } from './../../store/actions/get-users.action';
import { Store, select } from '@ngrx/store';
import { GetUsersResponseInterface } from './../../types/get-user-response.interface';
import { UserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
// import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

// import { MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { deleteUserAction } from '../../store/actions/delete.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['number', 'tn', 'fio', 'role', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    // this.cdr.detectChanges();
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
    this.loadUsers();
  }

  loadUsers() {
    this.store.pipe(select(allUsersSelector))
      .subscribe((value: any) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
      });
  }

  // TODO: ?????? ???????????????? ?????????????????? ???????????? ?? ?????????????? "ExpressionChangedAfterItHasBeenCheckedError"
  onOpenDialog(id?: number) {
    // this.cdr.detectChanges();
    this.store.dispatch(openEditDialogUserAction({id: id}));
  }

  onDestroyUser(id: number, fio: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '700px',
      disableClose: true,
      data: {
        title: '???? ?????????????????????????? ???????????? ?????????????? ????????????????????????:',
        message:  `"${fio}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.store.dispatch(deleteUserAction({id: id}));
      }
    });
  }

}
