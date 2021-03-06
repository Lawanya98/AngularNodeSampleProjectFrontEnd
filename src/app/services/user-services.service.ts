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

  authenicateUser(data: any) {
    console.log(data);
    return this.http.post('http://localhost:8090/api/authenticateUser', data).pipe(
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

  updateOTP(data: any) {
    console.log(data);
    return this.http.post('http://localhost:8090/api/updateOTP', data).pipe(
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

  requestPasswordReset(userName, email) {
    const user = {
      Email: btoa(email),
      UserName: btoa(userName)
    }
    return this.http.post('http://localhost:8090/api/requestPasswordReset', user).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  resetPassword(reqId, userReqId, keyCode, password, confirmPassword) {
    const user = {
      ReqId: reqId,
      KeyCode: keyCode,
      UserId: userReqId,
      NewPassword: password,
      ConfirmPassword: confirmPassword
    }
    return this.http.post('http://localhost:8090/api/resetPassword', user).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  validateForgotPasswordResetLinkActivated(reqId, keyCode) {
    return this.http.get(`http://localhost:8090/api/validatePasswordResetLink/${reqId}/${keyCode}`).pipe(
      map(response => {
        console.log(response);
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  checkPasswordAvailability(password, userId, reqId) {
    let passwordEnc = btoa(password);
    return this.http.get(`http://localhost:8090/api/checkPasswordAvailability/${passwordEnc}/${userId}/${reqId}`).pipe(
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
