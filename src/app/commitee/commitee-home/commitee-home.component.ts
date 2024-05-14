import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { commiteeService } from '../../service/commitee.service';
import { snackbarService } from '../../service/snackbar.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-commitee-home',
  templateUrl: './commitee-home.component.html',
  styleUrls: ['./commitee-home.component.css'],
})
export class CommiteeHomeComponent implements OnInit {
  baseUrl = environment.baseUrl;
  public data: any;
  cid: any;
  bl:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _cmservice: commiteeService,
    private snackbarService: snackbarService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cid = params['cid'];
      this.bl = params['bl'];
      // console.log(this.cid);
      if (this.cid) {
        const existingRosterCode = localStorage.getItem('rosterCode');
        if (existingRosterCode) {
          localStorage.removeItem('rosterCode');
        }

        localStorage.setItem('cid', this.cid);
        this.http
          .get(
            `${this.baseUrl}Committee/GetCommitteeById?committeeId=${this.cid}`
          )
          .subscribe((res: any) => {
            // console.log(res);
            this.data = res.data;
            const cmid = this.cid;
            const cmyear = res.data.committee_Year;
            const orgname = res.data.organizationName;
            const orgid = res.data.organizationId;
            const orghandle = res.data.organizationUserHandle;
            const bl = this.bl;
            // console.log(cmid, cmyear, orgname, orgid, orghandle);
            this._cmservice.getdata(cmid,cmyear,bl);
          });
      } else {
        console.log('Commitee id not found in the URL');
        // this.snackbarService.openError('Commitee id not found in the URL');
        // Handle the case where committee ID is not available in the URL
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
