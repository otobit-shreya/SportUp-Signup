import { Component } from '@angular/core';
import { CountdownModule } from 'ngx-countdown';
@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CountdownModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
 
}
