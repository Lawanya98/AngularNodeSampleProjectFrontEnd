import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { ItemServiceService } from '../services/item-service.service';
import { UserServicesService } from '../services/user-services.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('apiToken');
        let deviceId = localStorage.getItem("deviceId")
        let refreshToken = localStorage.getItem("refreshToken")
        let userId = localStorage.getItem('userId')

        if (token) {
            request = request.clone({
                setHeaders: {
                    authorization: token,
                    'device-id': btoa(deviceId),
                    'user-id': btoa(userId)
                }
            });
        }
        return next.handle(request).catch(err => {
            if (err.status === 440) {
                if (err.error.status.message == "jwt expired") {
                    //Genrate params for token refreshing
                    let params = {
                        token: token,
                        refreshToken: refreshToken
                    };
                    return this.http.post('http://localhost:8090/api/refreshToken', params).pipe(
                        (data: any) => {
                            //If reload successful update tokens
                            if (data.status == 200) {
                                //Update tokens
                                localStorage.setItem("apiToken", data.result.token);
                                //Clone our fieled request ant try to resend it
                                request = request.clone({
                                    setHeaders: {
                                        Authorization: data.result.token,
                                        'deviceId': btoa(deviceId)
                                    }
                                });

                            } else {
                                return next.handle(request).catch(err => {
                                    return Observable.throw(err);
                                    //Catch another error
                                });
                            }
                        }
                    );
                } else {
                    //Logout from account or do some other stuff
                    this.router.navigateByUrl('/')
                    localStorage.clear()
                }
            } else if (err.status === 401) {
                if (err.error.status.message == "Unauthorized") {
                    this.router.navigateByUrl('/')
                    localStorage.clear()
                }
            } else {

            }
            return Observable.throw(err);
        });
    }
}