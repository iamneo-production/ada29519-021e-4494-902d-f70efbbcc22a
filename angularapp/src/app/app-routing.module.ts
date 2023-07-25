import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';
import { UserComponent } from './component/user/user.component';
import { HomepageComponent } from './component/user/homepage/homepage.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { AuthGuard } from './component/guard/auth.guard';
import { AdminguardGuard } from './component/guard/adminguard.guard';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent ,canActivate:[AdminguardGuard]},
  { path: 'admin/dashboard', component:AdmindashboardComponent,canActivate:[AdminguardGuard]},
  { path: 'admin/addServiceCenter', component: AddServiceCenterComponent,canActivate:[AdminguardGuard] },
  { path: 'admin/editServiceCenter', component: EditServiceCenterComponent,canActivate:[AdminguardGuard] },
  { path: 'user', component: UserComponent ,canActivate:[AuthGuard]},
  { path: 'user/homepage', component: HomepageComponent ,canActivate:[AuthGuard]},
  { path: 'user/dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'user/appointment', component: AppointmentComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
