import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './component/admin/admin.component';

import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';

import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';


const routes: Routes = [

  { path: 'admin/dashboard', component: AdmindashboardComponent },
 
  { path: 'admin/editServiceCenter', component: EditServiceCenterComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }