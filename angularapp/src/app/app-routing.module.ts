import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AdminAddcenterComponent } from './admin/admin-addcenter/admin-addcenter.component';
import { AdminCenterprofileComponent } from './admin/admin-centerprofile/admin-centerprofile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  
  
  
  {
    path: 'adminaddcenter',
    component: AdminAddcenterComponent,
  },
  {
    path: 'admincenterprofile',
    component: AdminCenterprofileComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
