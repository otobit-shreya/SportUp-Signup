import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [ApiService],
})
export class MainComponent {
  myForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _apiservice: ApiService,
    private _cs: ContactService
  ) {
    // Initialize the form in the constructor
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userHandle: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      emailAddress: [''],
    });
  }

  

  goToProfile() {
    // if (this.myForm.invalid) {
    //   return;
    // }
    const contactNumber = this._cs.conatctval;
    const apiUrl = 'api/Player/sign-up';
    const formData = {
      fullName: this.myForm.getRawValue().fullName,
      userHandle: this.myForm.getRawValue().userHandle,
      dob: this.myForm.getRawValue().dob,
      emailAddress: this.myForm.getRawValue().emailAddress,
      gender: {
        id: Number(this.myForm.getRawValue().gender),
        text: '',
      },
      phoneNumber: contactNumber,
    };
    console.log(formData, 'fd');
    
    this._apiservice.post(apiUrl, formData).subscribe(
      
      (res) => {

        console.log('Data Submitted!');
      },
      (error) => {
        console.log(error, 'Error in submitting form');
      }
    );

    // this.http.post('https://sportupapi.otobit.com/Player/sign-up', formData)
    //   .subscribe(
    //     (response) => {
    //       console.log('Post request successful:', response);
    //       this.router.navigate(['/profile']);
    //     },
    //     (error) => {
    //       // Handle error response
    //       console.error('Post request failed:', error);
    //     }
    //   );
  }
}
