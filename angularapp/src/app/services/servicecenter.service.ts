import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceCenter } from '../helpers/serviceCenter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicecenterService {
  constructor(private http: HttpClient) { }
  editserviceCenterURL = "https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/editServiceCenter";
  deleteserviceCenterURL = "https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/deleteServiceCenter";
  getserviceCenterURL = "https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/getservicecenter";
  imageserviceCenterURL = "https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/image"
  addserviceCenterURL:string="https://8080-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/admin/addServiceCenter";
  
  addCenterDB(centerobj:any){
    return this.http.post<any>(`${this.addserviceCenterURL}`,centerobj)
  }
  getService(): Observable<serviceCenter[]> {
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
 

