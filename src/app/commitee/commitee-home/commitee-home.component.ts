import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { commiteeService } from '../../service/commitee.service';
import { snackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-commitee-home',
  templateUrl: './commitee-home.component.html',
  styleUrls: ['./commitee-home.component.css'],
})
export class CommiteeHomeComponent implements OnInit {
  public data: any;
  cid: any;

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
      // console.log(this.cid);
      if (this.cid) {
        const existingRosterCode = localStorage.getItem('rosterCode');
        if (existingRosterCode) {
          localStorage.removeItem('rosterCode');
        }

        localStorage.setItem('cid', this.cid);
        this.http
          .get(
            `https://sportupapi.otobit.com/api/Committee/GetCommitteeById?committeeId=${this.cid}`
          )
          .subscribe((res: any) => {
            // console.log(res);
            this.data = res.data;
            const cmid = this.cid;
            const cmyear = res.data.committee_Year;
            const orgname = res.data.organizationName;
            const orgid = res.data.organizationId;
            const orghandle = res.data.organizationUserHandle;
            // console.log(cmid, cmyear, orgname, orgid, orghandle);
            this._cmservice.getdata(cmid,cmyear);
          });
      } else {
        // console.log('Commitee not found in the URL');
        this.snackbarService.openError('Something went wrong');
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
