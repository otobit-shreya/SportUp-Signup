import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  sports: Sport[] = [
    // Initialize this with the actual sports data and icon paths
    { id: 1, name: 'Archery', icon: 'assets/Target 1.svg', selected: false },
    { id: 2, name: 'Badminton', icon: 'assets/Badminton 1.svg', selected: false },
    { id: 3, name: 'Cricket', icon: 'assets/Cricket 1.svg', selected: false },
    { id: 4, name: 'Football', icon: 'assets/Football 1.svg', selected: false },
    { id: 5, name: 'Snooker', icon: 'assets/Pool 1.svg', selected: false },
    { id: 6, name: 'Running', icon: 'assets/Running 1.svg', selected: false },
    { id: 7, name: 'Tennis', icon: 'assets/Tennis 1.svg', selected: false },
    { id: 8, name: 'Basketball', icon: 'assets/Basketball 1.svg', selected: false },
    { id: 9, name: 'Chess', icon: 'assets/Target 1.svg', selected: false },
    { id: 10, name: 'Frisbee', icon: 'assets/Frisbee.svg', selected: false },
    { id: 11, name: 'Hockey', icon: 'assets/Hockey 1.svg', selected: false },
    { id: 12, name: 'Rugby', icon: 'assets/Rugby 1.svg', selected: false },
    { id: 13, name: 'Table Tennis', icon: 'assets/Table Tennis 1.svg', selected: false },
    { id: 14, name: 'Volleyball', icon: 'assets/Volleyball 1.svg', selected: false },
  ];

  selectedSports(): Sport[] {
    return this.sports.filter(sport => sport.selected);
  }

  onSubmit(): void {
    if (this.selectedSports().length >= 3) {
      // Handle the form submission, for example, navigate to another route or display a message
      console.log('Selected sports:', this.selectedSports());
    } else {
      // Inform the user to select at least three sports
      alert('Please select at least 3 sports.');
    }
  }
}
