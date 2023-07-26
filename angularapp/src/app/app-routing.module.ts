import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { AdminComponent } from './component/admin/admin.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/addServiceCenter', component: AddServiceCenterComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/appointment', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
