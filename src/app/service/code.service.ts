import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodeService {
  sid!: number;
  rid: any;
  rcode: any;
  orghand: any;

  getnumber(sportid: number, rosterid: number, rostercode: any, organizationHandle: any) {
    this.sid = sportid;
    this.rid = rosterid;
    this.rcode = rostercode;
    this.orghand = organizationHandle;
  }
}
