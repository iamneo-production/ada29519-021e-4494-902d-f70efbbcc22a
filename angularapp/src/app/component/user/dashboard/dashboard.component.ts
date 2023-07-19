import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/helpers/appointment';
import { Reviewresponse } from 'src/app/helpers/review';
// import { Reviewresponse, Reviews } from 'src/app/helpers/reviews';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import ValidateForm from 'src/app/helpers/validateForm';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
=======
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/helpers/appointment';
import ValidateForm from 'src/app/helpers/validateForm';
import { AppointmentService } from 'src/app/services/appointment.service';
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

<<<<<<< HEAD
  book='book'
  tdy: string = ''
=======
  serviceName: string = '';
  servicePhone: string = '';
  servicemailid: string = ''
  serviceimage: string = ''
  grid: string = ""
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

  productdetails!: FormGroup;
  appointmentdetails: any[] = [];
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []

<<<<<<< HEAD
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

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  constructor(
    private fb: FormBuilder,
    private appointment: AppointmentService,
    private share: ShareService,
<<<<<<< HEAD
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
=======
    private router: Router
  ) { }

  ngOnInit(): void {
    this.grid = localStorage.getItem('grid') || ''
    this.productdetails = this.fb.group({
      productName: ['', Validators.required],
      productModelNo: ['', Validators.required],
      dateOfPurchase: ['', [Validators.required, this.validatePastDate]],
      contactNumber: ['', Validators.required],
      problemDescription: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      maildid: this.share.Mailid,
      servicecenter: localStorage.getItem('serviceCenterName') || "",
      servicecentermailid: localStorage.getItem('serviceCenteramailId') || ""
    });
    

    this.serviceName = localStorage.getItem('serviceCenterName') || "";
    this.servicePhone = localStorage.getItem('serviceCenterPhone') || "";
    this.servicemailid = localStorage.getItem('serviceCenteramailId') || "";

    this.serviceimage = localStorage.getItem('serviceCenterImageUrl') || "";
    this.generateAvailableSlots();
    this.appointment.getExistingAppointments().subscribe(existingAppointments => {
      this.existingAppointments = existingAppointments;
      this.availableSlots.forEach(slot => {
        slot.times.forEach((timeSlot: { time: string; isBooked: boolean; }) => {
          const isBooked = existingAppointments.some(appointment => appointment.servicecenter === this.serviceName &&
            appointment.date === slot.date && appointment.time === timeSlot.time
          );
          timeSlot.isBooked = isBooked;
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
        });
      });
    });

<<<<<<< HEAD

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


=======
  }
  validatePastDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to the beginning of the day

    if (selectedDate >= currentDate) {
      return { futureDate: true };
    }
    return null;
  }
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  generateAvailableSlots() {
    const days = 5; // Number of days to show slots for
    const timeSlots = [
      { time: '08:00 AM - 10:00 AM', isBooked: false },
      { time: '11:00 AM - 01:00 PM', isBooked: false },
      { time: '02:00 PM - 04:00 PM', isBooked: false },
      { time: '05:00 PM - 07:00 PM', isBooked: false }
    ];

    const today = new Date();
<<<<<<< HEAD
    this.availableSlots = []; // Clear the array before generating new slots
    let isAllSlotsBooked = true;
    for (let i = 1; i < days + 1; i++) {
=======
    // const currentTime = today.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
    //console.log(currentTime)
    this.availableSlots = []; // Clear the array before generating new slots
    let isAllSlotsBooked = true;
    for (let i = 1; i < days+1; i++) {
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const dateString = `${day}-${month}-${year}`;

<<<<<<< HEAD
=======
      // const filteredTimeSlots = timeSlots.filter(timeSlot => {
      //   const startTime = timeSlot.time.split(' - ')[0];
      //   return today.toDateString() !== date.toDateString() || startTime >= currentTime;
      // });
  
      // const slot = {
      //   date: dateString,
      //   times: filteredTimeSlots.map(time => ({ time: time.time, isBooked: time.isBooked }))
      // };
      // console.log(slot)

>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      const slot = {
        date: dateString,
        times: timeSlots.map(time => ({ time: time.time, isBooked: time.isBooked }))
      };

      // Check if any slot is available for the current day
      const isAnySlotAvailable = timeSlots.some(timeSlot =>
        !this.existingAppointments.some(appointment =>
<<<<<<< HEAD
          appointment.serviceCenterId === this.servicecenterid &&
=======
          appointment.servicecenter === this.serviceName &&
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
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

<<<<<<< HEAD
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
=======

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
          console.log(response);
        });
        this.router.navigate(['user/appointment'])
      }
      else {
        ValidateForm.validateAllFormFileds(this.productdetails);
        alert("Form is invalid");
      }
    }
  }
}

>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
