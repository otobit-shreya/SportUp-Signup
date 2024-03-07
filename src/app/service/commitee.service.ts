import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class commiteeService {
    csid:any;
    csyear:any;

    getdata(cid:any,cyear:any){
        this.csid=cid;
        this.csyear=cyear;
    }
}