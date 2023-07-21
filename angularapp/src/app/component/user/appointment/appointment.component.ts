import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment, AppointmentResponse } from 'src/app/helpers/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import ValidateForm from 'src/app/helpers/validateForm';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


  AppointmentArr: AppointmentResponse[] = []
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []
  loadingStates: string[] = [];

  Email = localStorage.getItem('Email') || ""

  book='book'

  EditAppointment!: FormGroup
  review!: FormGroup

  imageurl: any
  rating: number = 0;
  showDownloadButton = false;

  serviceName: string = '';
  centerName: string = '';
  serviceCenterId: string = ""
  dbt: string = "download"
  tdy: string = ''
  errormessage: string = ''
  successmessage: string = ''
  servicecenterid = localStorage.getItem('serviceCenterID') || ''

  constructor(private appointments: AppointmentService, private fb: FormBuilder, private share: ShareService, private image: ServicecenterService) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.tdy = `${year}-${month}-${day}`;

  }

  ngOnInit(): void {
    this.getappointment()
    this.EditAppointment = this.fb.group({
      id: [""],
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,#\\-]+$')]],
      productModelNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s\\/\\-]+$')]],
      dateOfPurchase: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      problemDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,.\\s\\/]+$')]],
      time: ['', Validators.required],
      date: ['', Validators.required],
      UserEmailId: [""],
      ServiceCenterId: [""]

    });
    this.review = this.fb.group({
      UserEmailId: [localStorage.getItem('Email')],
      ServiceCenterId: [""],
      review: [''],
      rating: [this.rating]
    })

    this.generateAvailableSlots()
    this.appointments.getExistingAppointments().subscribe(existingAppointments => {
      this.existingAppointments = existingAppointments;
      this.availableSlots.forEach(slot => {
        slot.times.forEach((timeSlot: { time: string; isBooked: boolean; }) => {
          const isBooked = existingAppointments.some(appointment => appointment.serviceCenterId.toString() === this.servicecenterid.toString() &&
            appointment.date === slot.date && appointment.time === timeSlot.time
          );
          timeSlot.isBooked = isBooked;
        });
      });
    });
  }
  getappointment() {
    this.appointments.getappointment(this.Email).subscribe(response => {
      console.log(response);
      this.AppointmentArr = response;
      console.log(this.AppointmentArr)
    })
  }
  onDateSelected() {
    const sd = this.EditAppointment.get('dateOfPurchase')?.value
    console.log('Selected Date:', sd);
    // You can perform additional validation or actions with the selected date here
  }
  generateAvailableSlots() {
    const days = 5;
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

      const isAnySlotAvailable = timeSlots.some(timeSlot =>
        !this.existingAppointments.some(appointment =>
          appointment.serviceCenterId.toString() === this.servicecenterid.toString() &&
          appointment.date === dateString &&
          appointment.time === timeSlot.time
        )
      );

      if (isAnySlotAvailable) {
        isAllSlotsBooked = false;
      }

      this.availableSlots.push(slot);
    }

  }
  fillappointment(app: Appointment) {
    console.log(app)

    this.EditAppointment.setValue({
      id: app.id,
      productName: app.productName,
      productModelNo: app.productModelNo,
      dateOfPurchase: app.dateOfPurchase,
      contactNumber: app.contactNumber,
      problemDescription: app.problemDescription,
      time: app.time,
      date: app.date,
      UserEmailId: app.userEmailId,
      ServiceCenterId: app.serviceCenterId
    })

  }
  deleteappointment(Id: number) {
    this.appointments.cancelappointment(Id).subscribe(res => {
      console.log(res)
      this.successmessage = "appointment deleted successfully"
      setTimeout(() => {
        this.successmessage = '';
      }, 5000);
      this.getappointment()
    })

  }

  Update() {
    const selectedDate = this.EditAppointment.controls['date'].value;
    const selectedTime = this.EditAppointment.controls['time'].value;

    const isSlotBooked = this.existingAppointments.some(appointment => appointment.serviceCenterId === this.serviceName &&
      appointment.date === selectedDate && appointment.time === selectedTime
    );

    if (isSlotBooked) {
      console.log('Selected slot is already booked');
    } else {
      this.book='loading....'
      console.log("hello")
      if (this.EditAppointment.valid) {
        this.appointments.updateappointment(this.EditAppointment.value).subscribe(response => {
          this.successmessage = "appointment updated successfully"
          setTimeout(() => {
            this.successmessage = '';
          }, 5000);
          document.getElementById('closemodal')?.click();
          console.log(response)
          this.getappointment()
        })
        this.EditAppointment.reset()
        this.book='book'

      }
      else {
        if (this.EditAppointment.pristine) {
          this.errormessage = "Enter Your AC & Appointment Details"
          setTimeout(() => {
            this.errormessage = '';
          }, 5000);
          this.book='book'

        }
        else {
          ValidateForm.validateAllFormFileds(this.EditAppointment);
          this.errormessage = "Enter Valid Ac Details and Appointment Details"
          setTimeout(() => {
            this.errormessage = '';
          }, 5000);
          this.book='book'
        }
      }
    }
    

  }

  isserviceover(dt: any) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const dtParts = dt.split('-');
    const dtDay = parseInt(dtParts[0], 10);
    const dtMonth = parseInt(dtParts[1], 10);
    const dtYear = parseInt(dtParts[2], 10);

    const currentDateFormatted = new Date(currentYear, currentMonth - 1, currentDay);
    const dtFormatted = new Date(dtYear, dtMonth - 1, dtDay);

    console.log(dtFormatted, '<', currentDateFormatted);

    if (dtFormatted < currentDateFormatted)
      return true
    else if (dtFormatted > currentDateFormatted)
      return false
    else {
      console.log("both are sequenceEqual")
      return 'same'
    }

  }


  DownloadInvoice(pid: any, uid: any, sid: any, index: number) {
    const id = pid; // Declare and assign the 'id' variable using the 'pid' parameter

    this.loadingStates[index] = "loading..."; // Set the loading state for the button at the given index

    this.appointments.GenerateInvoicePDF(pid, uid, sid).subscribe(res => {
      const blob: Blob = res.body as Blob;
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.download = pid;
      a.href = url;
      a.click();
      this.loadingStates[index] = "download"; // Set the download state for the button at the given index
    });
  }




  serviceimg(serviceCenterId: string) {
    this.serviceCenterId = serviceCenterId
    this.image.getimage(serviceCenterId).subscribe(Res => {

      this.imageurl = Res.serviceCenterImageUrl
      this.centerName = Res.serviceCenterName

    })
  }

  rate(star: number) {
    this.rating = star;
    this.review.controls['rating'].setValue(star);
  }
  getStarsArray(): number[] {
    return [1, 2, 3, 4, 5];
  }
  reviews() {
    this.review.setValue({
      UserEmailId: localStorage.getItem('Email'),
      ServiceCenterId: this.serviceCenterId,
      review: this.review.get('review')?.value,
      rating: this.rating
    })
    console.log(this.review.value)
    this.appointments.postreview(this.review.value).subscribe(response => {
      this.successmessage = "review add successfully"
      setTimeout(() => {
        this.successmessage = "";
      }, 5000);
      console.log(response);
      this.review.reset()
    });
  }
  showFieldErrors() {
    Object.keys(this.EditAppointment.controls).forEach((key) => {
      this.EditAppointment.get(key)?.markAsTouched();
    });
  }

}
