import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string = 'assets/profile.png'; // Default image URL

  onFileSelected(event: any): void {
    console.log('File selected event:', event);
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Image URL updated:', e.target.result);
        this.imageUrl = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
