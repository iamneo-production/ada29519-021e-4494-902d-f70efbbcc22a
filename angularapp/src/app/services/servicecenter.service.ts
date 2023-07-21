import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceCenter } from '../helpers/serviceCenter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicecenterService {

<<<<<<< HEAD
  constructor(private http: HttpClient) { }
  editserviceCenterURL = "https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/editServiceCenter";
  deleteserviceCenterURL = "https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/deleteServiceCenter";
  getserviceCenterURL = "https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/getservicecenter";
  imageserviceCenterURL = "https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/image"

  getService(): Observable<serviceCenter[]> {
=======
  constructor(private http:HttpClient ) { }
  editserviceCenterURL="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/editServiceCenter";
  deleteserviceCenterURL="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/deleteServiceCenter";
  getserviceCenterURL="https://8080-fdaebccfffbabacbdeefceabbedabdfbab.project.examly.io/admin/getservicecenter"
                        
  getService():Observable<serviceCenter[]>{
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
    return this.http.get<serviceCenter[]>(this.getserviceCenterURL)

  }
  updateservice(ser: serviceCenter): Observable<serviceCenter> {
    return this.http.put<serviceCenter>(this.editserviceCenterURL + '/' + ser.serviceCenterID, ser)
  }
  deleteservice(id: string): Observable<serviceCenter> {
    return this.http.delete<serviceCenter>(this.deleteserviceCenterURL + '/' + id)
  }
  getimage(id: string): Observable<serviceCenter> {
    return this.http.get<serviceCenter>(this.imageserviceCenterURL + '/' + id)
  }
}

