import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface IHash {
  [key: string]: boolean;
}

export interface BreadCrumbHash {
  [key: string]: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http: HttpClient) { }

  private isLoggedInSource = new BehaviorSubject<boolean>(false);

  isLoggedIn = this.isLoggedInSource.asObservable();

  public setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }

}
