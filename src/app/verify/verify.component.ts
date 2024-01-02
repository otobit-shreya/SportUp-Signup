import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Observable, Subscription, interval, take } from 'rxjs';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, CountdownModule, FormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  providers: [ApiService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VerifyComponent implements OnInit, OnDestroy {
  otpInput = '';
  phoneNumber: string | null = null;
  number: any[] = [];
  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // subscribe to home component messages
    this.subscription = this.apiService.getNumber().subscribe((number) => {
      console.log(number);
      if (number) {
        this.number.push(number);
      } else {
        // clear messages when empty message received
        this.number = [];
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  continueClicked() {
    const apiUrl = 'api/Player/sign-up/verify-otp';
    console.log('Continue button clicked');
    console.log('Entered OTP:', this.otpInput);
    const mobileNumber = 1111111111;
    let obj = JSON.stringify(mobileNumber);
    const phone = {
      otp: 'string',
      contactNumber: obj,
    };
    this.apiService.post(apiUrl, phone).subscribe(
      (response: any) => {
        console.log('API response:', response);    
      },
      (error) => {
        // Handle API error response
        console.error('API error:', error);
      }
    );
  }
}
