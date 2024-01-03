import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class dataService {
  formData: any = {};
  constructor(private _apiService: ApiService) {}

  getdata(
    phoneNumber?: number,
    fullName?: string,
    userHandle?: string,
    dob?: string,
    gender?: {},
    emailAddress?: string,
    profilePicture?: any,
    sportNameLookupIds?: []
  ) {
    const apiUrl = 'api/Player/sign-up-v2';
    this.formData = {
      phoneNumber,
      fullName,
      userHandle,
      sportNameLookupIds,
      profilePicture,
      emailAddress,
      dob,
      gender,
    };
    console.log(this.formData, 'fd');

    this._apiService.post(apiUrl, this.formData).subscribe(
      (res) => {
        console.log('Data Submitted!');
      },
      (error) => {
        console.log(error, 'Error in submitting form');
      }
    );
  }
}
