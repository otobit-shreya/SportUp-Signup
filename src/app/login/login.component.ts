import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Injectable, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink, NgxIntlTelInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable()
export class LoginComponent implements OnInit{
  myForm: FormGroup = new FormGroup({});
  params!:any;

  constructor(@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    this.params = this.router.url.slice(1);
    const inputEle = (this.document.querySelector('.form-control input') as HTMLElement);
    this.renderer.setStyle(inputEle, 'border' , 'none');
    this.renderer.setStyle(inputEle,'width' , '330px');
    this.renderer.setStyle(inputEle,'boxShadow', 'none');

    // (document.querySelector('.form-control .show')as HTMLElement).style.width = '330px';
    (this.document.querySelector('.form-control >div>div >div:nth-of-type(2)')as HTMLElement).style.width = '335px';


  }
  

  onSubmit() {
    if (this.myForm.valid) {
      // Process form submission
    }
  }

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
}
