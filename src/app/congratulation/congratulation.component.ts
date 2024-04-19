import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../service/code.service';
import { Observable, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { commiteeService } from '../service/commitee.service';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.css']
})
export class CongratulationComponent implements OnInit {
  word!: string;
  bl: any;
  countDown: number = 5; // Initial countdown value
  timer$!: Observable<number>; // Timer observable

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _code: CodeService,
    private _cmtService: commiteeService
  ) {}

  ngOnInit(): void {
    // Retrieve the value of the "word" parameter from the query parameters
    this.route.queryParams.subscribe(params => {
      this.word = params['word'];
    });

    

    const rosterCode = localStorage.getItem('rosterCode');
    if (rosterCode) {
      this.bl = this._code.bl;
      // Set up timer
      this.timer$ = interval(1000).pipe(
        map(value => this.countDown - value), // Calculate remaining time
        takeWhile(value => value >= 0) // Stop when countdown reaches 0
      );

      // Redirect after 5 seconds
      setTimeout(() => {
        window.location.href = `https://sportup.app.link/${this.bl}`;
      }, 5000);
    }

    const cid = localStorage.getItem('cid');
    if (cid) {
      this.bl = this._cmtService.bl;
      setTimeout(() => {
        window.location.href = `https://sportup.app.link/${this.bl}`;
      }, 5000);
    }
    
    // Update countdown every second
    setInterval(() => {
      if (this.countDown > 0) {
        this.countDown--;
      }
    }, 1000);
  }
}
