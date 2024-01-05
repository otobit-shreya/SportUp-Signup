import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DataService]
})
export class HomeComponent implements OnInit {
 data: any;
  rostercode: any;
  rosterId: any;
  sportId: any;
  rosterCode!: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _ds: DataService
  ) {}
  ngOnInit(): void {
    // Subscribe to query parameters
    this.route.queryParams.subscribe(params => {
      this.rosterCode = params['rosterCode'];
 
      if (this.rosterCode) {
        this.http
          .get(`https://sportupapi.otobit.com/api/rosters/getRosterByCode/${this.rosterCode}`)
          .subscribe(
            (res: any) => {
              this.data = res.data;
              this.rosterCode = this.data.rosterCode;
              this.rosterId = this.data.rosterId;
              this.sportId = this.data.sportId;
              console.log(this.data, 'ress');
              this._ds.getCode(this.rosterId, this.sportId, this.rosterCode);
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