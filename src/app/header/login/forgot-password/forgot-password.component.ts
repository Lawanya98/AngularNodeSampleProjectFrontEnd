import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { UserServicesService } from 'src/app/services/user-services.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  ipAddress: any;

  constructor(private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private userService: UserServicesService) {

  }



  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    let userName = this.forgotPasswordForm.value.userName;
    let email = this.forgotPasswordForm.value.email;
    console.log("[forgot-password.ts]::38:userName" + userName);
    console.log("[forgot-password.ts]::39:email" + email);

    this.userService.requestPasswordReset(userName, email).subscribe(data => {
      console.log("[forgot-password.ts]::42:" + data);
      this.toastr.success('Password Reset Request Successful', 'Success', {
        closeButton: true,
        tapToDismiss: true,
        positionClass: 'toast-top-center'
      });
      this.forgotPasswordForm.reset()
    }, error => {
      console.log("[forgot-password.ts]::50:" + error);
      this.toastr.error(error.error.status.message, 'Error', {
        closeButton: true,
        tapToDismiss: true,
        positionClass: 'toast-top-center',
      });
    })

  }

  navigate() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
