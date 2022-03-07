import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  public user: any = null;

  constructor(private http: HttpClient) { }

  saveUser(user: any) {
    console.log(user);
    return this.http.post('http://localhost:8090/api/registerUser', user).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  logUser(user: any) {
    console.log(user);
    return this.http.post('http://localhost:8090/api/loginUser', user).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  refreshToken(params) {
    return this.http.post('http://localhost:8090/api/refreshToken', params).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }
}
