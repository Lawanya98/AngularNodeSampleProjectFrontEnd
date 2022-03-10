import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { UserServicesService } from 'src/app/services/user-services.service';
import { MustMatch } from '../../../shared/must-match.validators';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    public resetPasswordForm: FormGroup;
    private reqId: any;
    private userReqId: any;
    private keyCode: any
    private clientUrl: any
    public isPasswordAvailable: boolean = false
    public isResetPasswordLinkActivated: string = "";
    passwordPattern = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserServicesService,
        private toastr: ToastrService, private route: ActivatedRoute, private router: Router,) { }

    ngOnInit() {

        this.resetPasswordForm = this.formBuilder.group({
            password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
            passwordRetype: new FormControl('', Validators.required),
        },
            {
                validator: MustMatch('password', 'passwordRetype')
            })

        this.route.queryParamMap.subscribe(params => {
            console.log("[resetPasswordComponent]:: routeQueryParams:: " + params['params']['reqId']);
            this.reqId = params['params']['reqId'];
            this.userReqId = params['params']['userId'];
            this.keyCode = params['params']['keyCode'];
            console.log("ReqId==" + this.reqId);
            console.log("userReqId==" + this.userReqId);
        });

        if (this.reqId == undefined) {
            this.userReqId = localStorage.getItem('userId');
            this.isResetPasswordLinkActivated = "expired";
        }

        if (this.reqId != undefined && this.keyCode != undefined) {
            this.userService.validateForgotPasswordResetLinkActivated(this.reqId, this.keyCode)
                .subscribe(
                    data => {
                        this.isResetPasswordLinkActivated = "notActivated";
                    },
                    error => {
                        this.isResetPasswordLinkActivated = "activated";
                        this.toastr.error(error.error.status.message, 'Error', {
                            closeButton: true,
                            tapToDismiss: true,
                            positionClass: 'toast-top-center'
                        });
                    }
                );
        }

    }

    get f() { return this.resetPasswordForm.controls }

    onSubmit() {
        const control = this.resetPasswordForm.controls['password'];
        let password = this.f.password.value
        let confirmPassword = this.f.passwordRetype.value
        this.userService.checkPasswordAvailability(password, this.userReqId, this.reqId)
            .subscribe(data => {
                if (data['payload'].count > 0) {
                    this.toastr.error('Password is not valid as it exists', 'Error', {
                        closeButton: true,
                        tapToDismiss: true,
                        positionClass: 'toast-top-center'
                    });
                } else {
                    console.log("Starting to reset");
                    console.log("this.reqId" + this.reqId);
                    console.log(" this.userReqId" + this.userReqId);
                    console.log("this.keyCode" + this.keyCode);
                    console.log("password" + password);
                    console.log("confirmPassword" + confirmPassword);
                    this.userService.resetPassword(this.reqId, this.userReqId, this.keyCode, password, confirmPassword)
                        .subscribe(data => {
                            localStorage.clear()
                            this.clientUrl = "http://localhost:4200/"
                            this.toastr.success('Password reset successful', 'Success', {
                                closeButton: true,
                                tapToDismiss: true,
                                positionClass: 'toast-top-center'
                            });
                            localStorage.clear()

                            this.resetPasswordForm.reset();
                        },
                            error => {
                                this.toastr.error(error.error.status.message, 'Error', {
                                    closeButton: true,
                                    tapToDismiss: true,
                                    positionClass: 'toast-top-center'
                                });
                            })
                }
            },
                error => {

                })
    }

    redirectToForgotPassword() {
        this.router.navigate(['/forgotpassword'], { relativeTo: this.route });
    }

    navigate() {
        this.router.navigate(['/'], { relativeTo: this.route });
    }
}
