import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../services/shared-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(public sharedService: SharedServiceService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sharedService.isLoggedIn.subscribe(
      (result) => {
        this.isLoggedIn = result;
      });
    console.log(this.isLoggedIn);
  }

  openRegister() {
    console.log("clicked");
    const modalRef = this.modalService.open(RegisterComponent);
    console.log(modalRef);
    modalRef.componentInstance.title = 'Register';
  }

  openLogin() {
    console.log("clicked");
    const modalRef = this.modalService.open(LoginComponent);
    console.log(modalRef);
    modalRef.componentInstance.title = 'Login';
  }

  Logout() {
    this.sharedService.setIsLoggedIn(false);
    localStorage.clear();
    this.router.navigate(['/'], { relativeTo: this.route });
  }



}
