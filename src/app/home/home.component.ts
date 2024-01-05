import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { CodeService } from '../service/code.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DataService],
})
export class HomeComponent implements OnInit {
  data: any;
  rosterCode: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _ds: DataService,
    private _cs: CodeService
  ) {}
  ngOnInit(): void {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.rosterCode = params['rosterCode'];

      if (this.rosterCode) {
        this.http
          .get(
            `https://sportupapi.otobit.com/api/rosters/getRosterByCode/${this.rosterCode}`
          )
          .subscribe(
            (res: any) => {
              this.data = res.data;
              console.log(res.data, 'resssss');

              const rosterCode = this.rosterCode;
              const rosterId = this.data.rosterId;
              const sportId = this.data.sportId;
              this._cs.getnumber(sportId, rosterId, rosterCode);
              console.log(sportId, rosterId, rosterCode);
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        console.log('Roster code not found in the URL');
        // Handle the case where roster code is not available in the URL
      }
    });
  }
  onLogin() {
    this.router.navigate(['login'], { state: {} });
  }

  onSignUp() {
    this.router.navigate(['signup']);
  }
}
