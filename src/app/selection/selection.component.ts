import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Subscription } from 'rxjs';

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
  private dataSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private _data: DataService,
    private _apiService: ApiService
  ) {
    this.myForm = this.fb.group({
      course: ['MBA', Validators.required],
      batch: ['2023', Validators.required],
      position: [null, Validators.required],
    });   
   this.dataSubscription = this._data.data$.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  ngOnInit(): void {
    this.positionData();
  }

  

  positionData() {
    const apiUrl = 'https://sportupapi.otobit.com/api/SportPosition';
    const id = '1';
    const url = `${apiUrl}/${id}/positions`;
    this.http.get(url).subscribe(
      (res) => {
        this.positions = res;
        console.log(this.positions);
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
    console.log(this.myForm.value);
    const formValues = this.myForm.value;
    const apiUrl = 'api/rosters/addPlayersByCode';
    const data = {
      rostercode: this.data.rosterId,
      orgUserHandle: this.data.organizationHandle,
      player: {
        profilePicture: 'assets/profile.png',
        fullName: 'testing',
        userHandle: 'test_checking',
        courseName: formValues.course,
        year: formValues.batch,
        position: formValues.position,
        role: 'test',
      },
    };

    this._apiService.post(apiUrl, data).subscribe(
      (response: any) => {
        this.isUser = response.body.data.isSuccessful;
        console.log('API response:', response);
        if (this.isUser) {
          alert('Player detail added successfully');
          this.router.navigate(['congratulation']);
        } else {
          alert('Player detail added failed');
        }
      },
      (error) => {
        // Handle API error response
        console.error('API error:', error);
      }
    );
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
