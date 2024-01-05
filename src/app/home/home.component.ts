import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public data: any;
  rostercode: any;
  rosterId: any;
  sportId: any;
  orgHan: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _ds: DataService
  ) {}
  ngOnInit(): void {
    this.loadId();
  }

  loadId() {
    const apiUrl = 'https://sportupapi.otobit.com/api/rosters/getRosterByCode';
    const id = 'AXXG59';
    const url = `${apiUrl}/${id}`;
    this.http
      .get(url)
      .subscribe(
        (res: any) => {
          this.data = res.data;
          this.rosterId = this.data.rosterId;
          this.sportId = this.data.sportId;
          this.orgHan = this.data.organizationHandle
          this._ds.getData( this.data);
          console.log(this.data, 'ress');
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
