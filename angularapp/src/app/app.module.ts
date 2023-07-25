import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShareService } from './services/share.service';
import { AuthService } from './services/auth.service';
import { AppointmentService } from './services/appointment.service';
import { ServicecenterService } from './services/servicecenter.service';
import { AdminComponent } from './component/admin/admin.component';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { UserComponent } from './component/user/user.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    AddServiceCenterComponent,
    AdminComponent,
    UserComponent,
    AppointmentComponent
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
