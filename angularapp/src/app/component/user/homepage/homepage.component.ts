import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Reviews } from 'src/app/helpers/review';
// import { Reviews } from 'src/app/helpers/reviews';
=======
import { Reviews } from 'src/app/helpers/reviews';
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
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
<<<<<<< HEAD
      this.review.getreview(service.serviceCenterID).subscribe(res => {
=======
      this.review.getreview(service.serviceCenteramailId).subscribe(res => {
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
        this.ratingsMap[service.serviceCenteramailId] = res;
      });
    });
  }
  getAverageRating(mailid: string): number {
<<<<<<< HEAD
    return this.ratingsMap[mailid] || 1;
=======
    return this.ratingsMap[mailid] || 0;
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  }
  getStarRating(rating: number): string {
    const roundedRating = Math.round(rating);
    return '⭐'.repeat(roundedRating);
  }
  

<<<<<<< HEAD
  getServiceCenter(serviceCenterID:string) {
    localStorage.setItem('serviceCenterID',serviceCenterID)
  }


}
=======
  getServiceCenter(grid:string,serviceCenterName: string,serviceCenterPhone:string,serviceCenteramailId:string,serviceCenterImageUrl:string) {
    localStorage.setItem("serviceCenterName",serviceCenterName)
    localStorage.setItem("serviceCenterPhone",serviceCenterPhone)
    localStorage.setItem("serviceCenteramailId",serviceCenteramailId)
    localStorage.setItem("serviceCenterImageUrl",serviceCenterImageUrl)
    localStorage.setItem("grid",grid)

  }


}
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
