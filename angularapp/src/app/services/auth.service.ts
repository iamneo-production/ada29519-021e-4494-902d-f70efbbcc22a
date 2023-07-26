import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminloginurl:string="https://8080-cedfeaebafbbabccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/login"
  private adminsignupurl:string="https://8080-cedfeaebafbbabccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/signup"
  private userloginurl:string="https://8080-cedfeaebafbbabccfffbabacbdeefceabbedabdfbab.project.examly.io/user/login"
  private usersignupurl:string="https://8080-cedfeaebafbbabccfffbabacbdeefceabbedabdfbab.project.examly.io/user/signup"
                               
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
  // addCenterDB(centerobj:any){
  //   return this.http.post<any>(`${this.addserviceCenterURL}`,centerobj)
  // }
  // onBookDB(centerobj:any){
  //   console.log(centerobj)
  //   return this.http.post<any>(`${this.AddBookingURL}`,centerobj)
  // }
  setuser(user:string){
    localStorage.setItem('user',user)
  }
  setadmin(admin:string){
    localStorage.setItem('admin',admin)
  }
  isuserloggedin():boolean{
    return !!localStorage.getItem('user')
  }
  isadminloggedin():boolean{
    return !!localStorage.getItem('admin')
  }
}