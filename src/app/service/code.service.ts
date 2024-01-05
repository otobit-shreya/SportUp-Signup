import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodeService {
  sid!: number;
  rid: any;
  rcode: any;

  getnumber(sportid: number, rosterid: number, rostercode: any) {
    this.sid = sportid;
    this.rid = rosterid;
    this.rcode = rostercode;
  }
}
