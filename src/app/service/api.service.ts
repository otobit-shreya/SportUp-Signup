import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private baseApiUrl = 'https://sportupapi.otobit.com/';

  constructor(private http: HttpClient) {}

  private createHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
  }

  post(url: string, data: any = {}, params = {}): Observable<any> {
    url = this.baseApiUrl + url;
    const headers = this.createHttpHeaders();
    const body = JSON.stringify(data);

    const options = {
      headers: headers,
      observe: 'response' as const,
      params: new HttpParams({ fromObject: params }),
    };

    return this.http
      .post(url, body, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(error);
  }

}
