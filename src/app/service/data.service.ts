import { Injectable } from "@angular/core";
 
@Injectable({providedIn:'root'})
 
export class DataService {

  rosterCode!: any;
  sportId!:any;
  rosterId:any;
  
  getCode( sportId:any, rosterId:any, rosterCode:any) {
     sportId=sportId
     rosterId=rosterId
     rosterCode=rosterCode
     console.log(sportId, rosterId, 'sid', 'rid');
     
  }
}