import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  private addserviceCenterURL:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/admin/addServiceCenter";
  private AddBookingURL:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/api/Appointment/appointment_booking";
  private adminloginurl:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/admin/login"
  private adminsignupurl:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/admin/signup"
  private userloginurl:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/user/login"
  private usersignupurl:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/user/signup"
=======
  // private AuthURL:string="https://localhost:7052/api/Auth/";
  private addserviceCenterURL:string="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/addServiceCenter";
  private AddBookingURL:string="https://localhost:7049/api/Appointment/appointment_booking";
  private adminloginurl:string="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/login"
  private adminsignupurl:string="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/signup"
  private userloginurl:string="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/user/login"
  private usersignupurl:string="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/user/signup"
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
                               
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
<<<<<<< HEAD
=======

>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  onBookDB(centerobj:any){
    console.log(centerobj)
    return this.http.post<any>(`${this.AddBookingURL}`,centerobj)
  }
<<<<<<< HEAD
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
=======

}
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
