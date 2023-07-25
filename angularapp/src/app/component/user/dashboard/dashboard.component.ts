import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/helpers/appointment';
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

  serviceName: string = '';
  servicePhone: string = '';
  servicemailid: string = ''
  serviceimage: string = ''
  grid: string = ""
  tdy:string=''
  servicecenterdescription:string=''
  productdetails!: FormGroup;
  appointmentdetails: any[] = [];
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []
  servicesarr: serviceCenter[] = [];
  ratingsMap: { [key: string]: number } = {};
  successmessage:string
  errormessage:string

  constructor(
    private fb: FormBuilder,
    private appointment: AppointmentService,
    private share: ShareService,
    private router: Router,
    private service : ServicecenterService,
    private review : AppointmentService
  ) { 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.tdy = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.grid = localStorage.getItem('grid') || ''
    this.productdetails = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,#\\-]+$')]],
      productModelNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\/\\-]+$')]],
      dateOfPurchase: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      problemDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,.\\s\\/]+$')]],
      time: ['', Validators.required],
      date: ['', Validators.required],
      maildid: this.share.Mailid,
      servicecenter: localStorage.getItem('serviceCenterName') || "",
      servicecentermailid: localStorage.getItem('serviceCenteramailId') || ""
    });
    this.getservice() 

    this.serviceName = localStorage.getItem('serviceCenterName') || "";
    this.servicePhone = localStorage.getItem('serviceCenterPhone') || "";
    this.servicemailid = localStorage.getItem('serviceCenteramailId') || "";

    this.serviceimage = localStorage.getItem('serviceCenterImageUrl') || "";
    this.servicecenterdescription = localStorage.getItem('servicecenterdescription') || "";
    this.generateAvailableSlots();
    this.appointment.getExistingAppointments().subscribe(existingAppointments => {
      this.existingAppointments = existingAppointments;
      this.availableSlots.forEach(slot => {
        slot.times.forEach((timeSlot: { time: string; isBooked: boolean; }) => {
          const isBooked = existingAppointments.some(appointment => appointment.servicecenter === this.serviceName &&
            appointment.date === slot.date && appointment.time === timeSlot.time
          );
          timeSlot.isBooked = isBooked;
        });
      });
    });
    

  }
  errpopup() {
  this.errormessage = '';
}
  getservice() {
    this.service.getService().subscribe(Response => {
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
    return this.ratingsMap[mailid] || 1;
  }
  getStarRating(rating: number): string {
    const roundedRating = Math.round(rating);
    return '⭐'.repeat(roundedRating);
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

  let availableDays = 0;
  for (let i = 1; availableDays < days + 1; i++) {
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
        appointment.servicecenter === this.serviceName &&
        appointment.date === dateString &&
        appointment.time === timeSlot.time
      )
    );
    if (isAnySlotAvailable) {
      availableDays++;
      this.availableSlots.push(slot);
    }
  }

  return this.availableSlots;
}

isAnySlotAvailable(slot: any): boolean {
  return slot.times.some((timeSlot: { time: string; isBooked: boolean }) => !timeSlot.isBooked);
}
onDateSelected() {
  const sd = this.productdetails.get('dateOfPurchase')?.value
  console.log('Selected Date:', sd);
}




  onbook() {
    const selectedDate = this.productdetails.value.date;
    const selectedTime = this.productdetails.value.time;

    const isSlotBooked = this.existingAppointments.some(appointment => appointment.servicecenter === this.serviceName &&
      appointment.date === selectedDate && appointment.time === selectedTime
    );

    if (isSlotBooked) {
      console.log('Selected slot is already booked');
    } else {
      if (this.productdetails.valid) {
        console.log(this.productdetails.value);
        this.appointment.bookappointment(this.productdetails.value).subscribe(response => {
          this.successmessage="Appointment Booked"
          setTimeout(() => {
            this.successmessage = null;
          }, 5000);
          this.productdetails.reset()
          window.location.reload();
        });
        
      }
      else {
        if(this.productdetails.pristine){
          
          this.errormessage="Enter your AC Details"
          setTimeout(() => {
            this.errormessage = null;
          }, 5000);
          this.productdetails.markAllAsTouched;
        }
        else{
          ValidateForm.validateAllFormFileds(this.productdetails);

        this.errormessage="Enter Valid AC Details"
        setTimeout(() => {
          this.errormessage = null;
        }, 5000);
        this.productdetails.markAllAsTouched;
        }
      }
    }
  }
}

