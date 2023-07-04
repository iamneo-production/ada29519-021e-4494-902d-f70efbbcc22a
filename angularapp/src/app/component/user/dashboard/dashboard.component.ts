import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/helpers/appointment';
import ValidateForm from 'src/app/helpers/validateForm';
import { AppointmentService } from 'src/app/services/appointment.service';
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

  productdetails!: FormGroup;
  appointmentdetails: any[] = [];
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []

  constructor(
    private fb: FormBuilder,
    private appointment: AppointmentService,
    private share: ShareService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.grid = localStorage.getItem('grid') || ''
    this.productdetails = this.fb.group({
      productName: ['', Validators.required],
      productModelNo: ['', Validators.required],
      dateOfPurchase: ['', Validators.required],
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
        });
      });
    });

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
    for (let i = 0; i < days; i++) {
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

      // If any slot is available, mark isAllSlotsBooked as false
      if (isAnySlotAvailable) {
        isAllSlotsBooked = false;
      }

      this.availableSlots.push(slot);
    }


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

