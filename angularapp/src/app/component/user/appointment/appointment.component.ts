import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { AppointmentService } from 'src/app/services/appointment.service';
<<<<<<< HEAD
import { Appointment, AppointmentResponse } from 'src/app/helpers/appointment';
=======
import { Appointment } from 'src/app/helpers/appointment';
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import ValidateForm from 'src/app/helpers/validateForm';

<<<<<<< HEAD

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


<<<<<<< HEAD
  AppointmentArr: AppointmentResponse[] = []
=======
  AppointmentArr: Appointment[] = []
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []
  loadingStates: string[] = [];

<<<<<<< HEAD
  Email = localStorage.getItem('Email') || ""

  book='book'
=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

  EditAppointment!: FormGroup
  review!: FormGroup

  imageurl: any
  rating: number = 0;
  showDownloadButton = false;

  serviceName: string = '';
  centerName: string = '';
<<<<<<< HEAD
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
=======
  mailid: string = ""
  dbt: string = "download"

  constructor(private appointments: AppointmentService, private fb: FormBuilder, private share: ShareService, private image: ServicecenterService) { }

  ngOnInit(): void {
    

    this.EditAppointment = this.fb.group({
      id: [""],
      productName: ['', Validators.required],
      productModelNo: ['', Validators.required],
      dateOfPurchase: ['', Validators.required],
      contactNumber: ['', Validators.required],
      problemDescription: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      maildid: this.share.Mailid,
      servicecenter: ['']
    });
    this.review = this.fb.group({
      servicecentermailid: [''],
      review: [''],
      rating: [this.rating]
    })
    this.serviceName = this.share.serviceName;
    
    this.getappointment();
    this.generateAvailableSlots();
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
    this.appointments.getExistingAppointments().subscribe(existingAppointments => {
      this.existingAppointments = existingAppointments;
      this.availableSlots.forEach(slot => {
        slot.times.forEach((timeSlot: { time: string; isBooked: boolean; }) => {
<<<<<<< HEAD
          const isBooked = existingAppointments.some(appointment => appointment.serviceCenterId.toString() === this.servicecenterid.toString() &&
=======
          const isBooked = existingAppointments.some(appointment => appointment.servicecenter === this.serviceName &&
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
            appointment.date === slot.date && appointment.time === timeSlot.time
          );
          timeSlot.isBooked = isBooked;
        });
      });
    });
<<<<<<< HEAD
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
=======
    
  }
  getappointment() {
    this.appointments.getappointment().subscribe(response => {
      console.log(response);
      this.AppointmentArr = response;
    })
    
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  }
  generateAvailableSlots() {
    const days = 5;
    const timeSlots = [
      { time: '08:00 AM - 10:00 AM', isBooked: false },
      { time: '11:00 AM - 01:00 PM', isBooked: false },
      { time: '02:00 PM - 04:00 PM', isBooked: false },
      { time: '05:00 PM - 07:00 PM', isBooked: false }
    ];
<<<<<<< HEAD
=======
    
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

    const today = new Date();
    this.availableSlots = []; // Clear the array before generating new slots
    let isAllSlotsBooked = true;
<<<<<<< HEAD
    for (let i = 1; i < days + 1; i++) {
=======
    for (let i = 0; i < days; i++) {
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const dateString = `${day}-${month}-${year}`;
<<<<<<< HEAD
=======
     
      
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

      const slot = {
        date: dateString,
        times: timeSlots.map(time => ({ time: time.time, isBooked: time.isBooked }))
<<<<<<< HEAD
      };

      const isAnySlotAvailable = timeSlots.some(timeSlot =>
        !this.existingAppointments.some(appointment =>
          appointment.serviceCenterId.toString() === this.servicecenterid.toString() &&
=======
        
      };
      
      

      const isAnySlotAvailable = timeSlots.some(timeSlot =>
        !this.existingAppointments.some(appointment =>
          appointment.servicecenter === this.serviceName &&
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
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
<<<<<<< HEAD
    console.log(app)

=======

    console.log(app.servicecenter)
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
    this.EditAppointment.setValue({
      id: app.id,
      productName: app.productName,
      productModelNo: app.productModelNo,
      dateOfPurchase: app.dateOfPurchase,
      contactNumber: app.contactNumber,
      problemDescription: app.problemDescription,
      time: app.time,
      date: app.date,
<<<<<<< HEAD
      UserEmailId: app.userEmailId,
      ServiceCenterId: app.serviceCenterId
=======
      maildid: app.maildid,
      servicecenter: app.servicecenter
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
    })

  }
  deleteappointment(Id: number) {
    this.appointments.cancelappointment(Id).subscribe(res => {
      console.log(res)
<<<<<<< HEAD
      this.successmessage = "appointment deleted successfully"
      setTimeout(() => {
        this.successmessage = '';
      }, 5000);
      this.getappointment()
    })

=======
    })
    this.getappointment()
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  }

  Update() {
    const selectedDate = this.EditAppointment.controls['date'].value;
    const selectedTime = this.EditAppointment.controls['time'].value;

<<<<<<< HEAD
    const isSlotBooked = this.existingAppointments.some(appointment => appointment.serviceCenterId === this.serviceName &&
=======
    const isSlotBooked = this.existingAppointments.some(appointment => appointment.servicecenter === this.serviceName &&
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      appointment.date === selectedDate && appointment.time === selectedTime
    );

    if (isSlotBooked) {
      console.log('Selected slot is already booked');
    } else {
<<<<<<< HEAD
      this.book='loading....'
      console.log("hello")
      if (this.EditAppointment.valid) {
        this.appointments.updateappointment(this.EditAppointment.value).subscribe(response => {
          this.successmessage = "appointment updated successfully"
          setTimeout(() => {
            this.successmessage = '';
          }, 5000);
          document.getElementById('closemodal')?.click();
=======
      if (this.EditAppointment.valid) {
        this.appointments.updateappointment(this.EditAppointment.value).subscribe(response => {
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
          console.log(response)
          this.getappointment()
        })
        this.EditAppointment.reset()
<<<<<<< HEAD
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
    
=======
      }
      else {
        ValidateForm.validateAllFormFileds(this.EditAppointment);
        alert("Form is invalid");
      }
    }
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

  }

  isserviceover(dt: any) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
<<<<<<< HEAD

=======
  
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
    const dtParts = dt.split('-');
    const dtDay = parseInt(dtParts[0], 10);
    const dtMonth = parseInt(dtParts[1], 10);
    const dtYear = parseInt(dtParts[2], 10);
<<<<<<< HEAD

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

=======
  
    const currentDateFormatted = new Date(currentYear, currentMonth - 1, currentDay);
    const dtFormatted = new Date(dtYear, dtMonth - 1, dtDay);
  
    console.log(dtFormatted, '<', currentDateFormatted);
  
    return dtFormatted < currentDateFormatted;

    
  }
  
    
  DownloadInvoice(pid: any, uid: any, sid: any, index: number) {
    const id = pid; // Declare and assign the 'id' variable using the 'pid' parameter
  
    this.loadingStates[index] = "loading..."; // Set the loading state for the button at the given index
  
    this.appointments.GenerateInvoicePDF(pid, uid, sid).subscribe(res => {
      const blob: Blob = res.body as Blob;
      const url = window.URL.createObjectURL(blob);
  
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      const a = document.createElement('a');
      a.download = pid;
      a.href = url;
      a.click();
      this.loadingStates[index] = "download"; // Set the download state for the button at the given index
    });
  }




<<<<<<< HEAD
  serviceimg(serviceCenterId: string) {
    this.serviceCenterId = serviceCenterId
    this.image.getimage(serviceCenterId).subscribe(Res => {
=======

  serviceimg(url: string) {
    this.mailid = url
    console.log(this.mailid)
    
    this.image.getimage(url).subscribe(Res => {
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

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
<<<<<<< HEAD
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
=======
    this.review.controls['servicecentermailid'].setValue(this.mailid)
    console.log(this.review.value)
    this.appointments.postreview(this.review.value).subscribe(response => {
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      console.log(response);
      this.review.reset()
    });
  }
<<<<<<< HEAD
  showFieldErrors() {
    Object.keys(this.EditAppointment.controls).forEach((key) => {
      this.EditAppointment.get(key)?.markAsTouched();
    });
  }

}
=======


}
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
