import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';

const TIMER_DURATION = 60; // Set the initial time in seconds
const TIMER_STORAGE_KEY = 'otpTimer';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
 
}
