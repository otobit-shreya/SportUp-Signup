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
  file: File | null = null;

  constructor(private _apiService: ApiService) {}

  onFileSelected(event: any): void {
    console.log(event)
    this.file = event.target.files[0];

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(this.file);
    }
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  imageSelect(): void {
    console.log('Test');

    if (this.file) {
      const apiUrl = 'api/ImageUpload/upload';
      const formData = new FormData();
      formData.append('file', this.file);

      // Assuming your API expects a POST request with FormData
      this._apiService.post(apiUrl, formData).subscribe(
        (res) => {
          console.log('Image uploaded successfully:', res);
          // You can handle the response as needed
        },
        (error) => {
          console.error('Error uploading image:', error);
          // Handle the error accordingly
        }
      )    
    }
  }
}
