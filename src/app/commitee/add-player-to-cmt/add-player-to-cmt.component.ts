
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';
import { commiteeService } from '../../service/commitee.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { snackbarService } from '../../service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player-to-cmt',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-player-to-cmt.component.html',
  styleUrl: './add-player-to-cmt.component.css'
})
export class AddPlayerToCmtComponent implements OnInit{
  private detailsSubscription: Subscription;
  addPlayerForm!: FormGroup;
  data: any;
  details: any;
  courseName: string = '';
  batchYear: string = '';
  cid: any;
  cyear: any;
  userHandle: any;

  constructor(
    private _detail: UserService,
    private formBuilder: FormBuilder,
    private _cmservice: commiteeService,
    private _snackbar: snackbarService,
    private router: Router,
    private http: HttpClient
  ) {
  this.detailsSubscription = this._detail.data$.subscribe((detail) => {
    this.details = detail;
    // console.log(this.details);
  });
  this.userHandle = this.details.userHandle;
  // console.log(this.userHandle,'suuvv');
   this.cid =this._cmservice.csid
   this.cyear = this._cmservice.csyear
  //  console.log(this.cid, this.cyear,'dfsdfsd');
}

ngOnInit(): void {
  this.addPlayerForm = this.formBuilder.group({
    courseName: ['', Validators.required],
    batchYear: ['', Validators.required],
    role: ['', Validators.required]
  });
}
addPlayerToCommittee(): void {
  const requestBody = {
    committee_Year: this.cyear,
    userHandle: this.userHandle,
    courseName: this.addPlayerForm.value.courseName,
    batchYear: this.addPlayerForm.value.batchYear,
    role: this.addPlayerForm.value.role,
  };
  console.log(requestBody,'rrrr');
  
  this.http
  .post(`https://sportupapi.otobit.com/api/Committee/addplayerToCommitteeByQR?committeeId=${this.cid}`,requestBody)
  .subscribe((response: any) => {
    // Handle success response
    // console.log('Player added successfully:', response);
    this._snackbar.openSuccess('Player added to commitee successfully');
    // Redirect or show a success message
    this.router.navigate(['/congratulation'], { queryParams: { word: 'Committee' } });

  },
  (error) => {
    // Handle error response
    // console.error('Error adding player:', error);
    this._snackbar.openError('Player already exist in commitee');
  }
);
  
}

}
