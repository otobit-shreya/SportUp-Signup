import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';

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
  sports: any[] = [];
  sportNameLookupIds: any = [];
  sportId:any;


  constructor(
    private http: HttpClient,
    private router: Router,
    private _apiservice: ApiService,
    private _ds: DataService
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
      console.log(
        this.phoneNumber,
        this.fullName,
        this.userHandle,
        this.dob,
        this.gender,
        this.emailAddress,
        this.profilePicture,
      );
    }
  }

  ngOnInit(): void {
    
    this.http
      .get('https://sportupapi.otobit.com/api/GetSportNameLookups')
      .subscribe(
        (res: any) => {
          console.log(res.sport_dict, 'API response');

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

          console.log(mappedArray);
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
    if (!this.sportNameLookupIds) {
      this.sportNameLookupIds = [];
    }

    this.sportId = this._ds.sportId;
    console.log(this.sportId, 'sid submit');
    


    const selected = this.selectedSports();
    if (selected.length >= 3) {
      selected.forEach((sport) => {
        this.sportNameLookupIds.push(sport.id);
      });
      const apiUrl = 'api/Player/sign-up-v2';
      const formData = {
        phoneNumber: this.phoneNumber,
        fullName: this.fullName,
        userHandle: this.userHandle,
        sportNameLookupIds: this.sportNameLookupIds,
        profilePicture: this.profilePicture,
        emailAddress: this.emailAddress,
        dob: this.dob,
        gender: this.gender,
        sportId:this.sportId
      };

      console.log(formData, 'formData positions');

      // Assuming _apiservice.post method is available in your ApiService
      // this._apiservice.post(apiUrl, formData).subscribe(
      //   (res) => {
      //     console.log('Data Submitted!');
      //     this.router.navigate(['/selection']);
      //   },
      //   (error) => {
      //     console.log(error, 'Error in submitting form');
      //     alert('Something went wrong ');
      //   }
      // );
    } else {
      alert('Please select at least 3 sports.');
    }
  }

  
}
