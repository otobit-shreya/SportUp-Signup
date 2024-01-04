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
  public data: any;
  rostercode: any;
  rosterId: any;
  sportId: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _ds: DataService
  ) {}
  ngOnInit(): void {
    this.http
      .get(`https://sportupapi.otobit.com/api/rosters/getRosterByCode/AXXG59`)
      .subscribe(
        (res: any) => {
          this.data = res.data;
          this.rosterId = this.data.rosterId;
          this.sportId = this.data.sportId;
          console.log(this.data, 'ress');
          this._ds.getCode(this.rosterId, this.sportId);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  onLogin() {
    this.router.navigate(['login'], { state: {} });
  }

  onSignUp() {
    this.router.navigate(['signup']);
  }
}
