import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent implements OnInit{

  constructor(){}
  ngOnInit(): void {
      
  }
}
