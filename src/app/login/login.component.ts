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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterLink],
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
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });

    this.params = this.router.url.slice(1);
  }

  onSubmit() {
    const apiUrl = 'api/Player/sign-up/request-otp';

    if (this.myForm.valid) {
      const mobileNumberControl = this.myForm.get('mobileNumber');
      if (mobileNumberControl) {
        const mobileNumber = mobileNumberControl.value;
        let obj = JSON.stringify(mobileNumber);
        const phone = {
          otp: 'string',
          contactNumber: obj,
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
    } else {
      // Handle form validation errors
      console.error('Form validation error');
    }
  }
}
