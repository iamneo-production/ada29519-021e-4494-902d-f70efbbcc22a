import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './component/admin/admin.component';
import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';

import { ShareService } from './services/share.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';









@NgModule({
  declarations: [
    AppComponent,
    
    AdminComponent,
  
    EditServiceCenterComponent,

    AdmindashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    //Ng2SearchPipeModule 
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }