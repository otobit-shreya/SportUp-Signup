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

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [ApiService],
})
export class MainComponent implements OnInit {
  myForm: FormGroup;
  phoneNumber: any='';

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
      userHandle: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      emailAddress: [''],
    });
    this.phoneNumber = this._cs.conatctval;
  }

  ngOnInit(): void {
      this.http.get('https://sportupapi.otobit.com/api/CommonFixedLookup/GetByType/GenderType').subscribe(res=>{
        console.log(res, 'get gender');
        
      }, error=>{
        console.log('Error');
        
      })
  }

  goToProfile() {
  
    const apiUrl = 'api/Player/sign-up-v2';
    const formData = {
      fullName: this.myForm.getRawValue().fullName,
      userHandle: this.myForm.getRawValue().userHandle,
      dob: this.myForm.getRawValue().dob,
      emailAddress: this.myForm.getRawValue().emailAddress,
      gender: {
        id: Number(this.myForm.getRawValue().gender),
        text: "string",
      },
      phoneNumber: this.phoneNumber,
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
  }
}
