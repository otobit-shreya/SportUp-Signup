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
import { ContactService } from '../service/contact.service';
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
  isUser!:boolean;

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _cs: ContactService
  ) {
    // subscribe to home component messages
    this.subscription = this._apiService.getNumber().subscribe((number) => {
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
    const contactNumber = this._cs.conatctval;
    const apiUrl = 'api/Player/sign-up/verify-otp';
    const obj = {
      otp: 'string',
      contactNumber: contactNumber,
    };
    console.log(obj, 'obj');
    this._apiService.post(apiUrl, obj).subscribe(
      (res) => {
        alert('Data Submitted Successfully!')
        this.isUser = res.body.data.hasPlayer;
        if(this.isUser === true){
          this.router.navigate(['/selection'])
        }
        else if(this.isUser === false){
          this.router.navigate(['/details'])
        }
        
      },
      (error) => {
        console.log(error, 'Error in submitting form');
      }
    );
  }
}
