import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css',
  providers: [ApiService],
})
export class PositionsComponent {
  phoneNumber: number = 0;
  fullName: string = '';
  userHandle: string = '';
  dob: string = '';
  gender: any = {};
  emailAddress: string = '';
  profilePicture: string = '';

  constructor(private _apiservice: ApiService, private http: HttpClient,private router: Router, private _ds:DataService) {
    const currentNavigation = this.router.getCurrentNavigation();
    if(currentNavigation?.extras.state){
      this.phoneNumber = currentNavigation.extras.state['phoneNumber'];
      this.fullName = currentNavigation.extras.state['fullName'];
      this.userHandle = currentNavigation.extras.state['userHandle'];
      this.dob = currentNavigation.extras.state['dob'];
      this.gender = currentNavigation.extras.state['gender'];
      this.emailAddress = currentNavigation.extras.state['emailAddress'];
      this.profilePicture = currentNavigation.extras.state['profilePicture'];
      console.log(this.phoneNumber,this.fullName,this.userHandle,this.dob,this.gender,this.emailAddress,this.profilePicture);
    }
  }

  sports: Sport[] = [
    // Initialize this with the actual sports data and icon paths
    { id: 1, name: 'Archery', icon: 'assets/Target 1.svg', selected: false },
    {id: 2,name: 'Badminton',icon: 'assets/Badminton 1.svg',selected: false,},
    { id: 3, name: 'Cricket', icon: 'assets/Cricket 1.svg', selected: false },
    { id: 4, name: 'Football', icon: 'assets/Football 1.svg', selected: false },
    { id: 5, name: 'Snooker', icon: 'assets/Pool 1.svg', selected: false },
    { id: 6, name: 'Running', icon: 'assets/Running 1.svg', selected: false },
    { id: 7, name: 'Tennis', icon: 'assets/Tennis 1.svg', selected: false },
    {id: 8,name: 'Basketball',icon: 'assets/Basketball 1.svg',selected: false,},
    { id: 9, name: 'Chess', icon: 'assets/Target 1.svg', selected: false },
    { id: 10, name: 'Frisbee', icon: 'assets/Frisbee.svg', selected: false },
    { id: 11, name: 'Hockey', icon: 'assets/Hockey 1.svg', selected: false },
    { id: 12, name: 'Rugby', icon: 'assets/Rugby 1.svg', selected: false },
    {id: 13,name: 'Table Tennis',icon: 'assets/Table Tennis 1.svg',selected: false,},
    {id: 14,name: 'Volleyball',icon: 'assets/Volleyball 1.svg',selected: false,},
  ];

  sportNameLookupIds: any = [];

  selectedSports(): Sport[] {
    return this.sports.filter((sport) => sport.selected);
  }

  onSubmit(): void {
    const selected = this.selectedSports();
    if (selected.length >= 3) {
      selected.forEach((sport) => {
        // console.log(sport.id, sport.name);
        this.sportNameLookupIds.push(sport.id);
      });
       const apiUrl = 'api/Player/sign-up-v2';
const sportId = this._ds.sportId
      // console.log(this.sportNameLookupIds, 'formData');
      const formData = {
        phoneNumber :this.phoneNumber,
        fullName: this.fullName,
        userHandle: this.userHandle,
        sportNameLookupIds : this.sportNameLookupIds,
        profilePicture: this.profilePicture,
        emailAddress: this.emailAddress,
        dob: this.dob,
        gender: this.gender,
        sportId:sportId
      }
      console.log(formData,'formData');

      this._apiservice.post(apiUrl, formData).subscribe(
      
        (res) => {
          console.log('Data Submitted!');
          
        },
        (error) => {
          console.log(error, 'Error in submitting form');
        }
      );  
    } else {
      alert('Please select at least 3 sports.');
    }
  }
}
