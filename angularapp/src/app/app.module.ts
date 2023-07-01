// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { AdminComponent } from './component/admin/admin.component';
// import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
// import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     AdminComponent,
//     AddServiceCenterComponent,
//     EditServiceCenterComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }










import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgForm } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddServiceCenterComponent,
    EditServiceCenterComponent,
    // HelperComponent,
    // HelpersComponent,
    // ServicesComponent,
    // ServiceCenterTsComponent,
    // SharingTsComponent,
    // ValidateFormTsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
