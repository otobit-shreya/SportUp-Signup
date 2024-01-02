import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {

}
