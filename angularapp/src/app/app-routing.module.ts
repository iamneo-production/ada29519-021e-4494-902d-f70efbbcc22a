import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './component/admin/admin.component';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
 

  { path: 'admin/addServiceCenter', component: AddServiceCenterComponent },
  { path: 'admin/editServiceCenter', component: EditServiceCenterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }