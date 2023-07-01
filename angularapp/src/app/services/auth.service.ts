import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AuthURL:string="https://localhost:7052/api/Auth/";
  private AddCenterURL:string="https://localhost:7052/api/ServiceCenter/";
  private AddBookingURL:string="https://localhost:7052/api/Appointment/appointment_booking";
  
  constructor(private http:HttpClient) { }
   signup(userobj:any){
     return this.http.post<any>(`${this.AuthURL}register`,userobj)
   }
  login(loginobj:any ){
       return this.http.post<any>(`${this.AuthURL}authenticate`,loginobj)
  }
  addCenterDB(centerobj:any){
    return this.http.post<any>(`${this.AddCenterURL}addServiceCenter`,centerobj)
  }
  editCenterDB(centerobj:any){
    return this.http.post<any>(`${this.AddCenterURL}`,centerobj)
  }
  onBookDB(centerobj:any){
    return this.http.post<any>(`${this.AddBookingURL}`,centerobj)
  }
}