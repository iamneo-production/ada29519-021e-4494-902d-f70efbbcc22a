import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './component/user/user.component';
import { HomepageComponent } from './component/user/homepage/homepage.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { ShareService } from './services/share.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CarouselComponent } from './component/carousel/carousel.component';










@NgModule({
  declarations: [
    AppComponent,
   
    UserComponent,
    DashboardComponent,
    AppointmentComponent,
    HomepageComponent,
    CarouselComponent
    
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
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }