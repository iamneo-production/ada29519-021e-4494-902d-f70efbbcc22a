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
import { ComponentComponent } from './component/component.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { HomepageComponent } from './component/user/homepage/homepage.component';
import { CarouselComponent } from './component/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddServiceCenterComponent,
    EditServiceCenterComponent,
    ComponentComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    AdmindashboardComponent,
    AppointmentComponent,
    DashboardComponent,
    HomepageComponent,
    CarouselComponent,
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
