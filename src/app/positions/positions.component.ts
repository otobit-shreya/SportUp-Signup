import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';
import { CodeService } from '../service/code.service';
import { Subscription } from 'rxjs';
import { snackbarService } from '../service/snackbar.service';
import { UserService } from '../service/user.service';
// import {MatChipsModule} from '@angular/material/chips';

interface Sport {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
  providers: [ ApiService],
})
export class PositionsComponent implements OnInit {
  phoneNumber: number = 0;
  fullName: string = '';
  userHandle: string = '';
  dob: string = '';
  gender: any = {};
  emailAddress: string = '';
  profilePicture: string = '';
  data: any;
  sports: any[] = [];
  sportNameLookupIds: any = [];
  spId:any;
  rosterId:any;

  private dataSubscription: Subscription;

  constructor(
    private _apiservice: ApiService,
    private http: HttpClient,
    private router: Router,
    private _ds: DataService,
    private _cs: CodeService,
    private _snackbar: snackbarService,
    private _us: UserService,
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.phoneNumber = currentNavigation.extras.state['phoneNumber'];
      this.fullName = currentNavigation.extras.state['fullName'];
      this.userHandle = currentNavigation.extras.state['userHandle'];
      this.dob = currentNavigation.extras.state['dob'];
      this.gender = currentNavigation.extras.state['gender'];
      this.emailAddress = currentNavigation.extras.state['emailAddress'];
      this.profilePicture = currentNavigation.extras.state['profilePicture'];
      // console.log(
      //   this.phoneNumber,
      //   this.fullName,
      //   this.userHandle,
      //   this.dob,
      //   this.gender,
      //   this.emailAddress,
      //   this.profilePicture,
      // );
    }

    this.dataSubscription = this._ds.data$.subscribe((data) => {
      this.data = data;
      // console.log(this.data);
    });
  }

  ngOnInit(): void {
    
    this.http
      .get('https://sportupapi.otobit.com/api/GetSportNameLookups')
      .subscribe(
        (res: any) => {
          // console.log(res.sport_dict, 'API response');

          // Assuming res.sport_dict is an object
          const sportDict = res.sport_dict;

          // Using Object.keys() to iterate over the properties
          const mappedArray = Object.keys(sportDict).map(key => ({
            id: sportDict[key],
            name: key
          }));

          this.sports = Object.keys(sportDict).map(key => ({
            id: sportDict[key],
            name: key
          }));

          // console.log(mappedArray);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  selectedSports(): Sport[] {
    return this.sports.filter((sport) => sport.selected);
  }
  onSubmit(): void {

    this.spId = this._cs.sid;
    // console.log(this.spId, 'positions');
    

    if (!this.sportNameLookupIds) {
      this.sportNameLookupIds = [];
    }
    


    const selected = this.selectedSports();
    if (selected.length >= 3) {
      selected.forEach((sport) => {
        this.sportNameLookupIds.push(sport.id);
      });
      const apiUrl = 'api/Player/sign-up-v2';
      // const sportId = this.data.sportId;
      // console.log(sportId);
      // console.log(this.sportNameLookupIds, 'formData');
      const formData = {
        phoneNumber: this.phoneNumber,
        fullName: this.fullName,
        userHandle: this.userHandle,
        sportId:this.spId,
        sportNameLookupIds: this.sportNameLookupIds,
        profilePicture: this.profilePicture,
        emailAddress: this.emailAddress,
        dob: this.dob,
        gender: this.gender,
        
      };

      // console.log(formData, 'formData positions');

      // Assuming _apiservice.post method is available in your ApiService
      this._apiservice.post(apiUrl, formData).subscribe(
        (res) => {
          // console.log('Data Submitted!',res);
          const detail = res.body.data.userDetails;
          this._us.getdetails( detail);
          this._snackbar.openSuccess('Signup Successful');
          this.router.navigate(['/selection']);
        },
        (error) => {
          // console.log(error, 'Error in submitting form');
          this._snackbar.openError('Signup Failed');
          // alert('Something went wrong ');
        }
      );
    } else {
      alert('Please select at least 3 sports.');
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
