import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ContactService } from '../service/contact.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';
import { snackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [ApiService],
})
export class MainComponent implements OnInit {
  myForm: FormGroup;
  phoneNumber: any = '';
  today: string;
  genderData: any;
  usernameAvailability: boolean | null = null; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _apiservice: ApiService,
    private _cs: ContactService,
    private _ds: DataService,
    private _snack: snackbarService
  ) {
    // Initialize the form in the constructor
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userHandle: ['',Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      emailAddress: [''],
    });
    this.phoneNumber = this._cs.conatctval;

    const currentDate = new Date();
    this.today = currentDate.toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.gender();
  }

  gender() {
    this.http
      .get(
        'https://sportupapi.otobit.com/api/CommonFixedLookup/GetByType/GenderType'
      )
      .subscribe(
        (res: any) => {
          this.genderData = res.data;
        },
        (error) => {
          // console.log('Error');
          this._snack.openError('Something went wrong')
        }
      );
  }

  // Function to check username availability
  checkUsernameAvailability() {
    const username = this.myForm.get('userHandle')?.value;
    if (username) {
      this.http.get(`https://sportupapi.otobit.com/api/User/CheckUsernameAvailability?userhandle=${username}`)
        .subscribe(
          (res: any) => {
            this.usernameAvailability = res.isAvailable;
          },
          (error) => {
            // console.log('Error checking username availability');
            this._snack.openError('Error checking username availability')
            this.usernameAvailability = null;
          }
        );
    } else {
      this.usernameAvailability = null;
    }
  }

  // dateBeforeTodayValidator() {
  //   return (control: any) => {
  //     const selectedDate = new Date(control.value);
  //     const today = new Date();

  //     if (selectedDate > today) {
  //       return { dateBeforeToday: true };
  //     }

  //     return null;
  //   };
  // }
  goToProfile() {
    if (this.myForm.valid) {
      const fullName = this.myForm.getRawValue().fullName;
      const [firstName, ...lastNameArray] = fullName.split(' ');
      const lastName = lastNameArray.join(' ');
      
      const userHandle = this.myForm.getRawValue().userHandle;
      const dob = this.myForm.getRawValue().dob;
      const emailAddress = this.myForm.getRawValue().emailAddress;
      const gender = {
        id: Number(this.myForm.getRawValue().gender),
        text: Number(this.myForm.getRawValue().gender) === 3 ? 'Male' : 'Female',
      };
  
      const phoneNumber = this.phoneNumber;
  // console.log(fullName,firstName,lastName,userHandle,phoneNumber,dob,emailAddress,gender);
  
      this.router.navigate(['/profile'], {
        state: { phoneNumber, fullName, firstName, lastName, userHandle, dob, gender, emailAddress },
      });
    } else {
      alert('Form is invalid');
    }
  }
}
