import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private addserviceCenterURL:string="https://8080-edbedcefdafadfffbabacbdeedecebedadbdbbef.project.examly.io/admin/addServiceCenter";
                           
  constructor(private http:HttpClient) { }
  
  addCenterDB(centerobj:any){
    return this.http.post<any>(`${this.addserviceCenterURL}`,centerobj)
  }
  
  
}