import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/helpers/appointment';
import { Reviewresponse } from 'src/app/helpers/review';
// import { Reviewresponse, Reviews } from 'src/app/helpers/reviews';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import ValidateForm from 'src/app/helpers/validateForm';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  book='book'
  tdy: string = ''

  productdetails!: FormGroup;
  appointmentdetails: any[] = [];
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []

  // service center
  serviceimage = ''
  serviceName = ''
  servicemailid = ''
  servicePhone = ''
  servicecenterdescription = ''
  rating:any

  reviewarr: Reviewresponse[] = []
  ratingsMap: { [key: string]: number } = {};
  successmessage: string = ''
  errormessage: string = ''

  servicecenterid = localStorage.getItem("serviceCenterID") || ""

  constructor(
    private fb: FormBuilder,
    private appointment: AppointmentService,
    private share: ShareService,
    private router: Router,
    private service: ServicecenterService,
    private review: AppointmentService
  ) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.tdy = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.productdetails = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,#\\-]+$')]],
      productModelNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\/\\-]+$')]],
      dateOfPurchase: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      problemDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,.\\s\\/]+$')]],
      time: ['', Validators.required],
      date: ['', Validators.required],
      UserEmailId: [localStorage.getItem('Email')],
      ServiceCenterId: [localStorage.getItem('serviceCenterID')]
    });
    this.getservicecenter()
    this.getreview()
    this.getAverageRating()
    this.generateAvailableSlots();
    this.appointment.getExistingAppointments().subscribe(existingAppointments => {
      this.existingAppointments = existingAppointments;
      console.log(this.existingAppointments)
      for (let i = 0; i < this.existingAppointments.length; i++) {
        const appointment = this.existingAppointments[i].serviceCenterId.toString();
        console.log(appointment, "=", this.servicecenterid, appointment === this.servicecenterid);
      }
      console.log(this.existingAppointments.some(appointment => appointment.serviceCenterId === this.servicecenterid))
      this.availableSlots.forEach(slot => {
        slot.times.forEach((timeSlot: { time: string; isBooked: boolean; }) => {
          const isBooked = existingAppointments.some(appointment => appointment.serviceCenterId.toString() === this.servicecenterid.toString() &&
            appointment.date === slot.date && appointment.time === timeSlot.time
          );
          timeSlot.isBooked = isBooked;
          console.log(timeSlot)
        });
      });
    });


  }
  getservicecenter() {
    this.service.getimage(this.servicecenterid).subscribe(res => {
      this.serviceimage = res.serviceCenterImageUrl
      this.serviceName = res.serviceCenterName
      this.servicemailid = res.serviceCenteramailId
      this.servicePhone = res.serviceCenterPhone
      this.servicecenterdescription = res.serviceCenterDescription
    })
  }

getreview(){
  this.appointment.getreviews(this.servicecenterid).subscribe(res=>{
    console.log(res)
    this.reviewarr=res
    console.log(this.reviewarr)
  })
}


  generateAvailableSlots() {
    const days = 5; // Number of days to show slots for
    const timeSlots = [
      { time: '08:00 AM - 10:00 AM', isBooked: false },
      { time: '11:00 AM - 01:00 PM', isBooked: false },
      { time: '02:00 PM - 04:00 PM', isBooked: false },
      { time: '05:00 PM - 07:00 PM', isBooked: false }
    ];

    const today = new Date();
    this.availableSlots = []; // Clear the array before generating new slots
    let isAllSlotsBooked = true;
    for (let i = 1; i < days + 1; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const dateString = `${day}-${month}-${year}`;

      const slot = {
        date: dateString,
        times: timeSlots.map(time => ({ time: time.time, isBooked: time.isBooked }))
      };

      // Check if any slot is available for the current day
      const isAnySlotAvailable = timeSlots.some(timeSlot =>
        !this.existingAppointments.some(appointment =>
          appointment.serviceCenterId === this.servicecenterid &&
          appointment.date === dateString &&
          appointment.time === timeSlot.time
        )
      );

      // If any slot is available, mark isAllSlotsBooked as false
      if (isAnySlotAvailable) {
        isAllSlotsBooked = false;
      }

      this.availableSlots.push(slot);
    }

    return this.availableSlots;
  }
  onDateSelected() {
    const sd = this.productdetails.get('dateOfPurchase')?.value
    console.log('Selected Date:', sd);
  }


  getAverageRating(){
    this.appointment.getreview(this.servicecenterid).subscribe(res=>{
      console.log(res)
      const roundedRating = Math.round(res);
    this.rating='⭐'.repeat(roundedRating);
    console.log(this.rating)
    })
  }


  onbook() {
    this.book='loading'
    if (this.productdetails.valid) {
      console.log(this.productdetails.value);
      this.appointment.bookappointment(this.productdetails.value).subscribe(response => {
        this.successmessage = "Appointment Booked"
        setTimeout(() => {
          this.successmessage = "";
        }, 5000);
        this.productdetails.reset()
        this.book='book'
      });
    }
    else {
      if (this.productdetails.pristine) {
        this.errormessage = "Enter your AC Details"
        setTimeout(() => {
          this.errormessage = "";
        }, 5000);
        this.productdetails.markAllAsTouched;
        this.book='book'
      }
      else {
        ValidateForm.validateAllFormFileds(this.productdetails);

        this.errormessage = "Enter Valid AC Details"
        setTimeout(() => {
          this.errormessage = "";
        }, 5000);
        this.productdetails.markAllAsTouched;
        this.book='book'
      }
    }
  }
  showFieldErrors() {
    Object.keys(this.productdetails.controls).forEach((key) => {
      this.productdetails.get(key)?.markAsTouched();
    });
  }

}