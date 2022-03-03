import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServicesService } from '../../services/user-services.service';
import { MustMatch } from '../../shared/must-match.validators';
import { User } from '../../shared/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailRegEx = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  public user: any = {
    Username: "",
    Password: "",
    Phone: "",
    Email: ""
  };

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public UserServices: UserServicesService, private router: Router) { }
  entryComponent: [
    RegisterComponent
  ]

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.f.userName.value);
    console.log(this.user);
    console.log(this.user.Username);
    this.user.Username = this.f.userName.value;
    this.user.Email = this.f.email.value;
    this.user.Phone = this.f.phoneNumber.value;
    this.user.Password = this.f.password.value;
    console.log(this.user);
    this.UserServices.saveUser(this.user).subscribe(data => {
      if (data['payload'].userId != null) {
        console.log(data);
        this.router.navigateByUrl('/');
        this.registerForm.reset();
      }

    },
      error => {
        console.log(error);
      }
    )

  }

  onReset() {
    this.registerForm.reset();
  }

}
