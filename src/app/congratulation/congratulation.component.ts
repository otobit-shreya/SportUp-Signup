import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-congratulation',
  standalone: true,
  imports: [],
  templateUrl: './congratulation.component.html',
  styleUrl: './congratulation.component.css'
})
export class CongratulationComponent implements OnInit {
  word!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the value of the "word" parameter from the query parameters
    this.route.queryParams.subscribe(params => {
      this.word = params['word'];
    });
  }
}
