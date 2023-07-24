import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './component/user/homepage/homepage.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';


const routes: Routes = [
 
  
  { path: 'user/homepage', component: HomepageComponent },
  { path: 'user/dashboard', component: DashboardComponent },
  { path: 'user/appointment', component: AppointmentComponent },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }