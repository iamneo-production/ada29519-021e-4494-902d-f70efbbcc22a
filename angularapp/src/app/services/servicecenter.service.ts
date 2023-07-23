import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceCenter } from '../helpers/serviceCenter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicecenterService {

  constructor(private http:HttpClient ) { }
  editserviceCenterURL="https://8080-fdaebccfffbabacbdeedecebedadbdbbef.project.examly.io/admin/editServiceCenter";
  deleteserviceCenterURL="https://8080-fdaebccfffbabacbdeedecebedadbdbbef.project.examly.io/admin/deleteServiceCenter";
  getserviceCenterURL="https://8080-fdaebccfffbabacbdeedecebedadbdbbef.project.examly.io/admin/getservicecenter"
  serviceCenterURL="https://8080-fdaebccfffbabacbdeedecebedadbdbbef.project.examly.io/admin"
                        
  getService():Observable<serviceCenter[]>{
    return this.http.get<serviceCenter[]>(this.getserviceCenterURL)

    } 
  updateservice(ser:serviceCenter):Observable<serviceCenter>{
    return this.http.put<serviceCenter>(this.editserviceCenterURL+'/'+ser.serviceCenterID,ser)
  }
  deleteservice(id:string):Observable<serviceCenter>{
    return this.http.delete<serviceCenter>(this.deleteserviceCenterURL+'/'+id)
  }
  getimage(id:string):Observable<serviceCenter>{
    return this.http.get<serviceCenter>(this.serviceCenterURL+'/'+id)
  }
  }