import { Component, OnInit } from '@angular/core';
import { Reviews } from 'src/app/helpers/reviews';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html', 
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  servicesarr: serviceCenter[] = [];
  reviewarr:Reviews[]=[]
  search:string=""
  ratingsMap: { [key: string]: number } = {};
  constructor (private services:ServicecenterService,private share:ShareService,private review:AppointmentService){

  }
  ngOnInit(): void {
    
    this.getservice();
  }
  getservice() {
    this.services.getService().subscribe(Response => {
      console.log(Response)
      this.servicesarr = Response;
      this.getAverageRatings();
    })
   
  }
  
  
  getAverageRatings() {
    this.servicesarr.forEach(service => {
      this.review.getreview(service.serviceCenteramailId).subscribe(res => {
        this.ratingsMap[service.serviceCenteramailId] = res;
      });
    });
  }
  getAverageRating(mailid: string): number {
    return this.ratingsMap[mailid] || 0;
  }
  getStarRating(rating: number): string {
    const roundedRating = Math.round(rating);
    return '⭐'.repeat(roundedRating);
  }
  

  getServiceCenter(grid:string,serviceCenterName: string,serviceCenterPhone:string,serviceCenteramailId:string,serviceCenterImageUrl:string) {
    localStorage.setItem("serviceCenterName",serviceCenterName)
    localStorage.setItem("serviceCenterPhone",serviceCenterPhone)
    localStorage.setItem("serviceCenteramailId",serviceCenteramailId)
    localStorage.setItem("serviceCenterImageUrl",serviceCenterImageUrl)
    localStorage.setItem("grid",grid)

  }


}
