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
export class VerifyComponent implements OnInit {
  otpInput = '';
  phoneNumber: any='';
  dialNum: any='';
  sendtp: any='';
  isUser!:boolean;
  verificationResult:any='';

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _cs: ContactService
  ) {
    this.phoneNumber = this._cs.conatctval;
    this.sendtp = this._cs.sendp;
    this.dialNum = this._cs.dial;

  }

  ngOnInit() {}

  

  continueClicked() {
    console.log(this._cs.conatctval)
    console.log(this._cs.sendp)
    const apiUrl = 'api/Player/sign-up/verify-otp';
    const obj = {
      otp: this.sendtp,
      contactNumber: this.phoneNumber,
    };
    console.log(obj, 'obj');
    this._apiService.post(apiUrl, obj).subscribe(
      (res) => {
         console.log(res)
        if (this.sendtp === this.otpInput) {
          this.verificationResult = 'OTP verified successfully';       
        this.isUser = res.body.data.hasPlayer;
        if(this.isUser === true){
          this.router.navigate(['/selection'])
        }
        else if(this.isUser === false){
          this.router.navigate(['/details'])
        }
      }
      else{
        this.verificationResult = 'OTP verification failed';
      }
        
      },
      (error) => {
        console.log(error, 'Error in submitting form');
      }
    );
  }

  // resendClicked(){  
  //   const apiUrl = 'api/Player/sign-up/resend-otp';   
  //       const phone = {
  //         otp: 'string',
  //         contactNumber: this.phoneNumber,
  //       };

  //       this._apiService.post(apiUrl, phone).subscribe(
  //         (response: any) => {
  //           console.log('API response:', response);

  //           this._cs.getotp(response.body.data);
  //           // Handle successful response, maybe navigate to the verification page
  //           this.router.navigate(['/verify']);
  //         },
  //         (error) => {
  //           // Handle API error response
  //           console.error('API error:', error);
  //         }
  //       );      
  //   }
}
