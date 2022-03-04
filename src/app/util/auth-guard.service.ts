import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private http: HttpClient, public auth: AuthService, public router: Router, private route: ActivatedRoute) { }

  canActivate(): boolean {

    const roleId = localStorage.getItem('roleId');
    if (!this.auth.isAuthenticated()) {
      this.router.navigate([''], { relativeTo: this.route });
    }
    return true;
  }
}
