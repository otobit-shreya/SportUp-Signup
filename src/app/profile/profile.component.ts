import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  providers: [ApiService],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = ''; // Default image URL

  phoneNumber: number = 0;
  fullName: string = '';
  firstName: string = '';
  lastName: string = '';
  userHandle: string = '';
  dob: string = '';
  gender: any = {};
  emailAddress: string = '';
  
  constructor(private _apiService: ApiService,private router: Router) {
    const currentNavigation = this.router.getCurrentNavigation();
    // console.log(currentNavigation,'nn');
    if(currentNavigation?.extras.state){
      this.phoneNumber = currentNavigation.extras.state['phoneNumber'];
      this.fullName = currentNavigation.extras.state['fullName'];
      this.firstName = currentNavigation.extras.state['firstName'];
      this.lastName = currentNavigation.extras.state['lastName'];
      this.userHandle = currentNavigation.extras.state['userHandle'];
      this.dob = currentNavigation.extras.state['dob'];
      this.gender = currentNavigation.extras.state['gender'];
      this.emailAddress = currentNavigation.extras.state['emailAddress'];
      console.log(this.phoneNumber,this.fullName,this.firstName,this.lastName,this.userHandle,this.dob,this.gender,this.emailAddress);
      
      
    }
    
  }

  ngOnInit(): void {
    
  }
  

  onFileSelected(event: any): void {
    const value = event.target.value;
    // console.log(event, 'vallll');
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // console.log(this.imageUrl);
        
      };

      reader.readAsDataURL(file);
    }
  }

  openFileInput($event:any): void {
    this.fileInput.nativeElement.click();
    // console.log($event, 'eeee');
    
  }

  imageSelect(event:any) {
    console.log(this.imageUrl, 'eeee');

    const profilePicture= this.imageUrl
   
      this.router.navigate(['/positions'],{state:{phoneNumber: this.phoneNumber,
        fullName: this.fullName,
        firstName: this.firstName,
        lastName: this.lastName,
        userHandle: this.userHandle,
        dob: this.dob,
        gender: this.gender,
        emailAddress: this.emailAddress,
        profilePicture: profilePicture}});

  }
}