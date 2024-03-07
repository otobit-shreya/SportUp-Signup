import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Observable, Subscription, interval, take } from 'rxjs';
import {
  CountdownConfig,
  CountdownEvent,
  CountdownModule,
  CountdownComponent,
} from 'ngx-countdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../service/contact.service';
import { UserService } from '../service/user.service';
import { snackbarService } from '../service/snackbar.service';
@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, CountdownModule, FormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  providers: [ApiService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VerifyComponent {
  @ViewChild('countdown', { static: false }) countdown!: CountdownComponent;
  otpInput = '';
  phoneNumber: any = '';
  dialNum: any = '';
  sendtp: any = '';
  resend: boolean = false;
  isUser!: boolean;
  verificationResult: any = '';
  countdownConfig: CountdownConfig = {
    leftTime: 60,
    format: 'm:ss',
  };

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _cs: ContactService,
    private _us: UserService,
    private _snackbar: snackbarService
  ) {
    this.phoneNumber = this._cs.conatctval;
    this.dialNum = this._cs.dial;
    this.sendtp = this._cs.sendp;
  }

  handleCountdownEvents(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.resend = true;
    }
  }

  resendClicked() {
    this.countdown.restart();
    const apiUrl = 'api/Player/sign-up/resend-otp';
    const phone = {
      otp: 'string',
      contactNumber: this.phoneNumber,
    };
    // console.log(this.phoneNumber);
    this._apiService.post(apiUrl, phone).subscribe(
      (response: any) => {
        // console.log('API response:', response);
        this.sendtp = response.body.data;
      },
      (error) => {
        // Handle API error response
        console.error('API error:', error);
      }
    );
  }

  continueClicked() {
    // console.log(this._cs.conatctval);
    // console.log(this._cs.sendp);
    const apiUrl = 'api/Player/sign-up/verify-otp';
    const obj = {
      otp: this.sendtp,
      contactNumber: this.phoneNumber,
    };
    // console.log(obj, 'obj');
    if (this.sendtp === this.otpInput) {
      this.verificationResult = 'OTP verified successfully';
      this._apiService.post(apiUrl, obj).subscribe(
        (res) => {
          // console.log(res);
          const detail = res.body.data.userDetails;
          this._us.getdetails( detail);
          this.isUser = res.body.data.hasPlayer;
          if (this.isUser === true) {
             // Check local storage for rosterCode             
          const rosterCode = localStorage.getItem('rosterCode');
          if (rosterCode) {
            this._snackbar.openSuccess('Login successful');
            this.router.navigate(['/selection'], { skipLocationChange: true });
            return; // Exit the method after redirection
          }
          
          // Check local storage for cid
          const cid = localStorage.getItem('cid');
          if (cid) {
            this.router.navigate(['/commitee/addplayer']);
            return; // Exit the method after redirection
          }
            // this._snackbar.openSuccess('Login successful');
            // this.router.navigate(['/selection'],{ skipLocationChange: true });
          } else if (this.isUser === false) {
            this.router.navigate(['/details']);
          }
        },
        (error) => {
          this._snackbar.openError('Something went wrong');
          console.log(error, 'Error in submitting form');
        }
      );
    } else {
      this.verificationResult = 'OTP verification failed';
    }
  }
}
