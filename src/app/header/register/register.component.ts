import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServicesService } from '../../services/user-services.service';
import { MustMatch } from '../../shared/must-match.validators';
import { User } from '../../shared/user.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailRegEx = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  passwordPattern = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  public user: any = {
    Username: "",
    Password: "",
    Phone: "",
    Email: ""
  };

  constructor(private fb: FormBuilder, private modalService: NgbModal, public UserServices: UserServicesService, private router: Router, private activeModal: NgbActiveModal, private route: ActivatedRoute, private toastr: ToastrService) { }
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
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
    console.log(this.f.email.errors);
  }

  onSubmit() {
    // console.log(this.registerForm.value);
    // console.log(this.f.userName.value);
    console.log(this.user);
    // console.log(this.user.Username);
    this.user.Username = this.f.userName.value;
    this.user.Email = this.f.email.value;
    this.user.Phone = this.f.phoneNumber.value;
    this.user.Password = this.f.password.value;
    console.log(this.user);
    this.UserServices.saveUser(this.user).subscribe(data => {
      console.log("60-->" + data['payload']);
      if (data['payload'] != null) {
        console.log("data['payload']" + data['payload']);
        // this.router.navigate([''], { relativeTo: this.route });
        setTimeout(() => {
          this.activeModal.dismiss();
        }, 1000);
        // this.toastr.success('Account Successfully', 'Success', {
        //   closeButton: true,
        //   tapToDismiss: true,
        //   timeOut: 2000,
        //   positionClass: 'toast-top-center',
        // })
        // this.registerForm.reset();
        this.router.navigate(['/otpverify', this.user.Username], { relativeTo: this.route });
      }

    },
      error => {
        // console.log("here on error");
        // console.log(error);
        this.toastr.error('Acoount Registration Error', 'Error', {
          closeButton: true,
          tapToDismiss: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        })

      }
    )

  }

  onReset() {
    this.registerForm.reset();
  }



}
