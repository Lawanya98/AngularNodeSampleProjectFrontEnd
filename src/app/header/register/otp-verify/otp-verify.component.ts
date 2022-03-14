import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {

  userName: any;
  otpVerifyForm: FormGroup;

  public data: any = {
    Username: "",
    OTP: ""
  }

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserServicesService, private toastr: ToastrService) { }

  get f() {
    return this.otpVerifyForm.controls;
  }

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('name');
    console.log(this.userName);

    this.otpVerifyForm = this.fb.group({
      otp: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.data.Username = this.userName;
    this.data.OTP = this.f.otp.value;
    this.userService.authenicateUser(this.data).subscribe(data => {
      console.log(data['payload']);
      if (data['payload']) {
        this.toastr.success('Account Successfully', 'Success', {
          closeButton: true,
          tapToDismiss: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        })
        this.router.navigate(['/'], { relativeTo: this.route });
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

      })

  }


}
