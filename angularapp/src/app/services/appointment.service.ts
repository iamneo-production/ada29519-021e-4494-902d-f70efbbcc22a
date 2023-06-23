import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../helpers/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  getappointmentURL ="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/user/appointments"
  bookappointmentURL="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/user/appointment"
  editappointmentURL="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/user/editappointment"
  deleteappointmentURL="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/user/cancelappointment"
  id=localStorage.getItem('email')

  constructor(private http:HttpClient) { }
  getappointment():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.getappointmentURL+'/'+this.id)
  }
  bookappointment(app:Appointment):Observable<Appointment>{
    
    return this.http.post<Appointment>(this.bookappointmentURL,app)
  }
  updateappointment(app:Appointment):Observable<Appointment>{
    return this.http.put<Appointment>(this.editappointmentURL+'/'+app.id,app)
  }
  cancelappointment(id:number):Observable<Appointment>{
    return this.http.delete<Appointment>(this.deleteappointmentURL+'/'+id)
  }
  getExistingAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.getappointmentURL)
  }
}
