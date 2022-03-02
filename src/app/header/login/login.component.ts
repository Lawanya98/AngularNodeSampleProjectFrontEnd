import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }
  entryComponents: [
    LoginComponent
  ]

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['']
    })
  }

  onSubmit() {

  }

}
