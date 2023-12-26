import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  myForm: FormGroup = new FormGroup({});
  params!:any;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    this.params = this.router.url.slice(1);
    
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Process form submission
    }
  }
}
