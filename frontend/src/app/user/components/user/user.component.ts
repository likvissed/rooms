import { UserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
// import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

// import { MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onCreateUser() {
    console.log('click');
    // this.dialogRef.open(UserNewComponent);
    this.dialog.open(UserNewDialogComponent, {
      width: '700px',
      disableClose: true
    });

    // this.dialog.open(UserNewComponent)

  }

}
