import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin/addServiceCenter', component: AddServiceCenterComponent },
  { path: 'user/appointment', component: AppointmentComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
