import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class commiteeService {
    csid:any;
    csyear:any;
    bl:any;

    getdata(cid:any,cyear:any,bl:any){
        this.csid=cid;
        this.csyear=cyear;
        this.bl=bl;
    }
}