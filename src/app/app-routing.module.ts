import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemUserViewComponent } from './item-user-view/item-user-view.component';
import { AuthGuardService as AuthGuard } from './util/auth-guard.service';
import { ForgotPasswordComponent } from './header/login/forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './header/login/forgot-username/forgot-username.component';
import { ResetPasswordComponent } from './header/login/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  //path to add, delete page with auth
  { path: 'items', component: ItemUserViewComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'forgotusername', component: ForgotUsernameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
