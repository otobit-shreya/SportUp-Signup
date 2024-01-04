import { Injectable } from "@angular/core";
 
@Injectable({providedIn:'root'})
 
export class DataService {

  rosterCode!: any;
  sportId!:any;
  rosterId:any;
  
  getCode( sportId:any, rosterId:any) {
     sportId=sportId
     rosterId=rosterId
     console.log(sportId, rosterId);
     
  }
}