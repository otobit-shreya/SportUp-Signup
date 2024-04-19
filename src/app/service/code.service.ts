import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodeService {
  sid!: number;
  rid: any;
  bl:any;
  rcode: any;
  orghand: any;

  getnumber(sportid: number, rosterid: number,bl:any, rostercode: any, organizationHandle: any) {
    this.sid = sportid;
    this.rid = rosterid;
    this.bl = bl;
    this.rcode = rostercode;
    this.orghand = organizationHandle;
  }
}
