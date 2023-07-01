import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceCenter } from '../helpers/serviceCenter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicecenterService {

  constructor(private http:HttpClient ) { }
  baseURl ="https://localhost:7052/api/ServiceCenter/serviceCenter";
  getService():Observable<serviceCenter[]>{
    return this.http.get<serviceCenter[]>(this.baseURl)

    } 
  updateservice(ser:serviceCenter):Observable<serviceCenter>{
    return this.http.put<serviceCenter>(this.baseURl+','+ser.id,ser)
  }
  deleteservice(id:number):Observable<serviceCenter>{
    return this.http.delete<serviceCenter>(this.baseURl+'/'+id)
  }
  }