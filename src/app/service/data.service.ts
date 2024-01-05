import { Injectable } from "@angular/core";
 
@Injectable({providedIn:'root'})
 
export class DataService {

  rosterCode!: any;
  sportId!:any;
  rosterId:any;
  
  getCode( sportId:any, rosterId:any, rosterCode:any) {
     this.sportId= sportId
     this.rosterId=rosterId
     this.rosterCode=rosterCode
     console.log(sportId, rosterId, 'sid', 'rid');
     
  }
}