import { Injectable } from "@angular/core";
 
@Injectable({providedIn:'root'})
 
export class ContactService {
  conatctval!: number;
  sendp!:any;
  dial!:any;

 
  
  getnumber(conatct: number) {
    this.conatctval = conatct;   
  }

  getDialNumber(dial: number) {
    this.dial = dial;   
  }

  getotp(otp:number){
    this.sendp=otp
  }
}