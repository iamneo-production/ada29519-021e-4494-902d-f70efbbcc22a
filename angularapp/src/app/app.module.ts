import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShareService } from './services/share.service';
import { AuthService } from './services/auth.service';
import { AppointmentService } from './services/appointment.service';
import { ServicecenterService } from './services/servicecenter.service';
import { CarouselComponent } from './component/carousel/carousel.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { UserComponent } from './component/user/user.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { HomepageComponent } from './component/user/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    AddServiceCenterComponent,
    EditServiceCenterComponent,
    UserComponent,
    DashboardComponent,
    AppointmentComponent,
    HomepageComponent,
    CarouselComponent,
    AdmindashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule 
    
  ],
  providers: [ShareService,AuthService,AppointmentService,ServicecenterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
