import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { dataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
  providers: [ApiService,dataService],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = 'assets/profile.png'; // Default image URL
  file: File | null = null;

  phoneNumber: number = 0;
  fullName: string = '';
  userHandle: string = '';
  dob: string = '';
  gender: any = {};
  emailAddress: string = '';
  
  constructor(private _apiService: ApiService,private _ds: dataService,private router: Router) {
    const currentNavigation = this.router.getCurrentNavigation();
    // console.log(currentNavigation,'nn');
    if(currentNavigation?.extras.state){
      this.phoneNumber = currentNavigation.extras.state['phoneNumber'];
      this.fullName = currentNavigation.extras.state['fullName'];
      this.userHandle = currentNavigation.extras.state['userHandle'];
      this.dob = currentNavigation.extras.state['dob'];
      this.gender = currentNavigation.extras.state['gender'];
      this.emailAddress = currentNavigation.extras.state['emailAddress'];
      console.log(this.phoneNumber,this.fullName,this.userHandle,this.dob,this.gender,this.emailAddress);
      
      
    }
    
  }

  ngOnInit(): void {
    
  }
  

  onFileSelected(event: any): void {
    const value = event.target.value;
    // console.log(event, 'vallll');
    const file: File = event.target.files[0];

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // console.log(this.imageUrl);
        
      };

      reader.readAsDataURL(this.file);
    }
  }

  openFileInput($event:any): void {
    this.fileInput.nativeElement.click();
    // console.log($event, 'eeee');
    
  }

  imageSelect(event:any) {
    // console.log(event, 'eeee');

    const profilePicture= this.imageUrl
   
      this.router.navigate(['/positions'],{state:{phoneNumber: this.phoneNumber,
        fullName: this.fullName,
        userHandle: this.userHandle,
        dob: this.dob,
        gender: this.gender,
        emailAddress: this.emailAddress,
        profilePicture: profilePicture}});
    


  }
}
