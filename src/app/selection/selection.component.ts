import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent implements OnInit{

  constructor(private http: HttpClient){}
  ngOnInit(): void {
      this.http.get(`https://sportupapi.otobit.com/api/SportPosition/1/positions`).subscribe(res => {
        console.log(res,"Selection res");
      }, err => {
        console.log(err);
      })
  }

  goToFinish(): void {
    const apiUrl = 'api/Player/sign-up-v2';
  }
}
