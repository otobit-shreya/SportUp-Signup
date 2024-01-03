import { Injectable } from "@angular/core";
 
@Injectable({providedIn:'root'})
 
export class ContactService {
  conatctval!: number;
  sendp!:any;
 
  
  getnumber(conatct: number) {
    this.conatctval = conatct;   
  }

  getotp(otp:number){
    this.sendp=otp
  }
}