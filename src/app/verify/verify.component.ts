import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { interval, Subscription } from 'rxjs';

const TIMER_DURATION = 60; // Set the initial time in seconds
const TIMER_STORAGE_KEY = 'otpTimer';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ RouterLink,CountdownModule,ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  otpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.maxLength(6)]],
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      // Process form submission
    }
  }
}
