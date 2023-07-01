import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShareService {
  serviceName:string=''
  setServiceCenterName(data:string):any{
    this.serviceName=data;
    console.log(this.serviceName)
  }
}
