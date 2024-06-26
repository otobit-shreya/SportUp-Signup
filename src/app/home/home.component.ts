import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CodeService } from '../service/code.service';
import { snackbarService } from '../service/snackbar.service';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  baseUrl = environment.baseUrl
  public data: any;
  rostercode: any;
  bl: any;
  rosterId: any;
  sportId: any;
  orgHan: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _cs: CodeService,
    private _snack: snackbarService
  ) {}
  ngOnInit(): void {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.rostercode = params['rosterCode'];
      this.bl = params['bl'];
      console.log(this.bl, 'bl');

      if (this.rostercode) {
        const existingcid = localStorage.getItem('cid');
        if (existingcid) {
          localStorage.removeItem('cid');
        }
        localStorage.setItem('rosterCode', this.rostercode);
        this.http
          .get(
            `${this.baseUrl}rosters/getRosterByCode/${this.rostercode}`
          )
          .subscribe(
            (res: any) => {
              this.data = res.data;
              // console.log(res.data, 'resssss');

              const rosterCode = this.rostercode;
              const rosterId = this.data.rosterId;
              const bl = this.bl;
              const sportId = this.data.sportId;
              const organizationHandle = this.data.organizationHandle;
              this._cs.getnumber(sportId, rosterId,bl, rosterCode,organizationHandle);
              // console.log(sportId,bl, rosterId, rosterCode,organizationHandle);
            },
            (err) => {
              console.log(err);
              // this._snack.openError('Something went wrong')
            }
          );
      } else {
        console.log('Roster code not found in the URL');
        // this._snack.openError('Roster code not found in the URL');
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
