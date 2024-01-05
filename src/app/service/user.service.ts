import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private detailsSubject = new BehaviorSubject<any>(null);
  public data$ = this.detailsSubject.asObservable();

  getdetails(details: any): void {
    this.detailsSubject.next(details);
  }
}
