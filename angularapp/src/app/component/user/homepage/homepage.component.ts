import { Component, OnInit } from '@angular/core';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html', 
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  servicesarr: serviceCenter[] = [];
  search:string=""
  constructor (private services:ServicecenterService,private share:ShareService){

  }
  ngOnInit(): void {
    
    this.getservice();
  }
  getservice() {
    this.services.getService().subscribe(Response => {
      console.log(Response)
      this.servicesarr = Response;
    })
  }
  
  getServiceCenter(grid:string,serviceCenterName: string,serviceCenterPhone:string,serviceCenteramailId:string,serviceCenterImageUrl:string) {
    localStorage.setItem("serviceCenterName",serviceCenterName)
    localStorage.setItem("serviceCenterPhone",serviceCenterPhone)
    localStorage.setItem("serviceCenteramailId",serviceCenteramailId)
    localStorage.setItem("serviceCenterImageUrl",serviceCenterImageUrl)
    localStorage.setItem("grid",grid)

  }
  
  

}
