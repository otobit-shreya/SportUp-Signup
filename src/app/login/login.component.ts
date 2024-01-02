import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Params, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import {  ElementRef, Inject, Injectable,  Renderer2 } from '@angular/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterLink,NgxIntlTelInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ApiService],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  params!: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef, 
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });

    this.params = this.router.url.slice(1);
    const inputEle = (this.document.querySelector('.form-control input') as HTMLElement);
    this.renderer.setStyle(inputEle, 'border' , 'none');
    this.renderer.setStyle(inputEle,'backgroundColor' , 'transparent');
    this.renderer.setStyle(inputEle,'boxShadow', 'none');
  }
  
  

  onSubmit() {
    console.log(this.myForm, 'fff');
    
    const apiUrl = 'api/Player/sign-up/request-otp';

    // if (this.myForm.valid) {
      
    const mobileNumberControl = this.myForm.getRawValue().mobileNumber.number;

      if (mobileNumberControl) {
       
        // let obj = JSON.stringify(mobileNumberControl);
        const phone = {
          otp: 'string',
          contactNumber: mobileNumberControl,
        };
        this.apiService.post(apiUrl, phone).subscribe(
          (response: any) => {
            console.log('API response:', response);

            this.apiService.sendNumber(phone.contactNumber);
            // Handle successful response, maybe navigate to the verification page
            this.router.navigate(['/verify']);
          },
          (error) => {
            // Handle API error response
            console.error('API error:', error);
          }
        );
      }
    // } else {
    //   // Handle form validation errors
    //   console.error('Form validation error');
    // }
  }



  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
}
