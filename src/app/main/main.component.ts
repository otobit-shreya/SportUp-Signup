import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ContactService } from '../service/contact.service';
import { dataService } from '../service/data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [ApiService,dataService],
})
export class MainComponent implements OnInit {
  myForm: FormGroup;
  phoneNumber: any='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _apiservice: ApiService,
    private _cs: ContactService,
    private _ds: dataService
  ) {
    // Initialize the form in the constructor
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userHandle: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      emailAddress: [''],
    });
    this.phoneNumber = this._cs.conatctval;
  }

  ngOnInit(): void {
      this.http.get('https://sportupapi.otobit.com/api/CommonFixedLookup/GetByType/GenderType').subscribe(res=>{
        console.log(res, 'get gender');
        
      }, error=>{
        console.log('Error');
        
      })
  }

  goToProfile() {
    if(this.myForm.valid){
      this.router.navigate(['/profile'])
      const fullName = this.myForm.getRawValue().fullName
      const userHandle = this.myForm.getRawValue().userHandle
      const dob = this.myForm.getRawValue().dob
      const emailAddress = this.myForm.getRawValue().emailAddress
      const gender= {
        id: Number(this.myForm.getRawValue().gender),
        text: (Number(this.myForm.getRawValue().gender) === 1) ? 'Male' : 'Female',
      }

      const phoneNumber = this.phoneNumber

      this._ds.getdata(phoneNumber,fullName,userHandle,dob,gender,emailAddress);
    }else{
      alert("Form is invalid")
    }
  }
}
