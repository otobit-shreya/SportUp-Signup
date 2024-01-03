import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
  providers: [ApiService],
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = 'assets/profile.png'; // Default image URL

  constructor(private _apiService: ApiService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  imageSelect(): void {
    console.log('Test');
    
    // Replace 'your-api-endpoint' with the actual URL of your API
    const apiUrl = 'api/ImageUpload/upload';
    
    // Assuming your API expects a POST request with a JSON body
    this._apiService.post(apiUrl,  this.imageUrl ).subscribe(
      (res) => {
        console.log('Image uploaded successfully:', res);
        // You can handle the response as needed
      },
      (error) => {
        console.error('Error uploading image:', error);
        // Handle the error accordingly
      }
    );
  }
}
