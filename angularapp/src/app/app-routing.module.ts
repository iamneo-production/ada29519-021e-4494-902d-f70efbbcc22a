import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomepageComponent } from './user/user-homepage/user-homepage.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserAppointmentComponent } from './user/user-appointment/user-appointment.component';
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
    path: 'userhome',
    component: UserHomepageComponent,
  },
  {
    path: 'userdashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'appointment',
    component: UserAppointmentComponent,
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
