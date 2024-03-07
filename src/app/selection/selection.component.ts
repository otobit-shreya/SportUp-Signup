import { HttpClient } from '@angular/common/http';import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { CodeService } from '../service/code.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { snackbarService } from '../service/snackbar.service';
@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
  providers: [ApiService, ContactService],
})
export class SelectionComponent implements OnInit,OnDestroy {
  sptId:any;
  rostId:any;
  orgHandle:any;
  isUser!: boolean;
  myForm: FormGroup;
  course: string = 'MBA';
  batch: string = '2023';
  positions: any;
  data: any;
  details: any;
  private dataSubscription: Subscription;
  private detailsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private _data: DataService,
    private _detail: UserService,
    private _apiService: ApiService,
    private _snackbar: snackbarService,
    private _cs : CodeService
  ) {
    this.myForm = this.fb.group({
      course: ['MBA', Validators.required],
      batch: ['2023', Validators.required],
      position: [null, Validators.required],
    });   
   this.dataSubscription = this._data.data$.subscribe((data) => {
      this.data = data;
      // console.log(this.data);
    });

    this.detailsSubscription = this._detail.data$.subscribe((detail) => {
      this.details = detail;
      // console.log(this.details);
    });
  }

  ngOnInit(): void {
    this.positionData();
  }

  

  positionData() {
    const apiUrl = 'https://sportupapi.otobit.com/api/SportPosition';
    const id = this._cs.sid;
    const url = `${apiUrl}/${id}/positions`;
    this.http.get(url).subscribe(
      (res) => {
        this.positions = res;
        // console.log(this.positions);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setValueBasedOnId(dsId: any): void {
    const selectedPositionId: any = dsId.target.value;
    this.myForm.patchValue({
      position: selectedPositionId,
    });
  }
  
  goToFinish(): void {
    // console.log(this.myForm.value);
    const formValues = this.myForm.value;
    const apiUrl = 'https://sportupapi.otobit.com/api/rosters/addPlayersByCode';
    const data = {
      rostercode: this._cs.rcode,
      orgUserHandle: this._cs.orghand,
      player: {
        profilePicture: this.details.profilePicture,
        fullName: this.details.fullName,
        userHandle: this.details.userHandle,
        courseName: formValues.course,
        year: formValues.batch,
        positionId: parseInt(formValues.position),
        role: "Player",
      },
    };
    // console.log(data,'dataaaaa');
    

    this.http.post(apiUrl, data).subscribe(
      (response: any) => {
        // console.log('API response:', response);
        // this.isUser = response.body.data.isSuccessful;
        // if (this.isUser) {
          this._snackbar.openSuccess('Player added successfully');
          // alert('Player detail added successfully');
          this.router.navigate(['/congratulation'], { queryParams: { word: 'team' }});
        // } else {
          // alert('Player detail added failed');
        // }
      },
      (error) => {
        // Handle API error response
        console.error('API error:', error);
        this._snackbar.openError('Something went wrong');

      }
    );
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}