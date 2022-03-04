import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemUserViewComponent } from './item-user-view/item-user-view.component';
import { AuthGuardService as AuthGuard } from './util/auth-guard.service';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  //path to add, delete page with auth
  { path: 'items', component: ItemUserViewComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
