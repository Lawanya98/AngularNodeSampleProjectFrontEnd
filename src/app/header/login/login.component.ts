import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Fingerprint2 from 'fingerprintjs2';
import { UserServicesService } from '../../services/user-services.service';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/util/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  deviceId: any;

  showPassword: boolean = false;

  public user: any = {
    Username: "",
    Password: "",
    DeviceId: ""
  };

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, public UserServices: UserServicesService, private toastr: ToastrService) { }
  entryComponents: [
    LoginComponent
  ]

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })

    var options = { excludeAdBlock: true, excludeJsFonts: true, excludeScreenResolution: true, excludeAvailableScreenResolution: true, excludeUserAgent: true };
    Fingerprint2.getV18(options, (result => this.setDeviceId(result)))
  }

  onSubmit() {
    this.user.Username = this.loginForm.value.Username;
    this.user.Password = this.loginForm.value.Password;
    this.user.DeviceId = this.deviceId;
    this.UserServices.logUser(this.user).subscribe(data => {
      console.log(data);
      console.log(data['payload']);
      this.toastr.clear();
      if (data['payload'].message == 'Password is expired') {
        this.toastr.error(Messages.PASSWORD_EXPIRED, 'Error', {
          closeButton: true,
          tapToDismiss: true,
          positionClass: 'toast-top-center'
        });
        localStorage.setItem('userId', data['payload'].user[0].Id);
        //redirect to reset password
        this.activeModal.dismiss();
      } else if (data['payload'].message == 'Invalid User') {
        this.toastr.error(Messages.INVALID_USER, 'Error', {
          closeButton: true,
          tapToDismiss: true,
          positionClass: 'toast-top-center'
        });
      } else {
        localStorage.setItem('apiToken', data['payload'].token);
        localStorage.setItem('refreshToken', data['payload'].refreshToken);
        localStorage.setItem('deviceId', this.deviceId);
        localStorage.setItem('userId', data['payload'].user[0].Id);
        localStorage.setItem('userName', data['payload'].user[0].UserName);
        console.log(localStorage);
        setTimeout(() => {
          this.activeModal.dismiss();
        }, 1000)


      }
    },
      error => {
        console.log(error);
        this.toastr.error(error.error.status.message, 'Error', {
          closeButton: true,
          tapToDismiss: true,
          positionClass: 'toast-top-center'
        });

      })

  }

  toggleFieldTextType() {
    this.showPassword = !this.showPassword;
  }

  setDeviceId(deviceId) {
    this.deviceId = deviceId;
    localStorage.setItem('deviceId', deviceId);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
