import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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

}
