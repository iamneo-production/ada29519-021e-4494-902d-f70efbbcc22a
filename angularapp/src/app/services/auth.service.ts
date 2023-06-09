import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private AuthURL:string="https://localhost:7052/api/Auth/";
  private addserviceCenterURL:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/addServiceCenter";
  private AddBookingURL:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/api/Appointment/appointment_booking";
  private adminloginurl:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/login"
  private adminsignupurl:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/signup"
  private userloginurl:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/user/login"
  private usersignupurl:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/user/signup"
                               
  constructor(private http:HttpClient) { }
  adminsignup(adminobj:any){
    return this.http.post<any>(`${this.adminsignupurl}`,adminobj)
  }

   usersignup(userobj:any){
     return this.http.post<any>(`${this.usersignupurl}`,userobj)
   }

   adminlogin(adminobj:any ){
    return this.http.post<any>(`${this.adminloginurl}`,adminobj)
}
  userlogin(loginobj:any ){
       return this.http.post<any>(`${this.userloginurl}`,loginobj)
  }
  addCenterDB(centerobj:any){
    return this.http.post<any>(`${this.addserviceCenterURL}`,centerobj)
  }
  // editCenterDB(centerobj:any){
  //   return this.http.post<any>(`${this.AddCenterURL}`,centerobj)
  // }
  onBookDB(centerobj:any){
    console.log(centerobj)
    return this.http.post<any>(`${this.AddBookingURL}`,centerobj)
  }

}
