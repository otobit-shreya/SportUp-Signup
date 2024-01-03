import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { dataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
  providers: [ApiService,dataService],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = 'assets/profile.png'; // Default image URL

  constructor(private _apiService: ApiService,private _ds: dataService) {}

  ngOnInit(): void {
    console.log(this._ds.formData, 'sss');
    
  }
  

  onFileSelected(event: any): void {
    const value = event.target.value;
    // console.log(event, 'vallll');
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl);
        
      };

      reader.readAsDataURL(file);
    }
  }

  openFileInput($event:any): void {
    this.fileInput.nativeElement.click();
    console.log($event, 'eeee');
    
  }

  imageSelect(event:any) {
    console.log(event, 'eeee');
    
    // console.log('Test'); 
    // Replace 'your-api-endpoint' with the actual URL of your API
    // const apiUrl = 'api/ImageUpload/upload';
    
    // Assuming your API expects a POST request with a JSON body
    // this._apiService.post(apiUrl,  this.imageUrl ).subscribe(
    //   (res) => {
    //     console.log('Image uploaded successfully:', res);
        // You can handle the response as needed
      // },
      // (error) => {
      //   console.error('Error uploading image:', error);
        // Handle the error accordingly
    //   }
    // );
    // console.log(this._ds.getdata(phoneNumber,fullName,userHandle,dob,gender));
    const profilePicture= this.imageUrl


  }
}
