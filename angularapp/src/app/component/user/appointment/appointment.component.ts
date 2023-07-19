import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/helpers/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicecenterService } from 'src/app/services/servicecenter.service';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {


  AppointmentArr: Appointment[] = []
  availableSlots: any[] = [];
  existingAppointments: Appointment[] = []
  loadingStates: string[] = [];


  EditAppointment!: FormGroup
  review!: FormGroup

  imageurl: any
  rating: number = 0;
  showDownloadButton = false;

  serviceName: string = '';
  centerName: string = '';
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
    this.appointments.getExistingAppointments().subscribe(existingAppointments => {
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
  getappointment() {
    this.appointments.getappointment().subscribe(response => {
      console.log(response);
      this.AppointmentArr = response;
    })
    
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
      
      

      const isAnySlotAvailable = timeSlots.some(timeSlot =>
        !this.existingAppointments.some(appointment =>
          appointment.servicecenter === this.serviceName &&
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

    console.log(app.servicecenter)
    this.EditAppointment.setValue({
      id: app.id,
      productName: app.productName,
      productModelNo: app.productModelNo,
      dateOfPurchase: app.dateOfPurchase,
      contactNumber: app.contactNumber,
      problemDescription: app.problemDescription,
      time: app.time,
      date: app.date,
      maildid: app.maildid,
      servicecenter: app.servicecenter
    })

  }
  deleteappointment(Id: number) {
    this.appointments.cancelappointment(Id).subscribe(res => {
      console.log(res)
    })
    this.getappointment()
  }

  Update() {
    const selectedDate = this.EditAppointment.controls['date'].value;
    const selectedTime = this.EditAppointment.controls['time'].value;

    const isSlotBooked = this.existingAppointments.some(appointment => appointment.servicecenter === this.serviceName &&
      appointment.date === selectedDate && appointment.time === selectedTime
    );

    if (isSlotBooked) {
      console.log('Selected slot is already booked');
    } else {
      if (this.EditAppointment.valid) {
        this.appointments.updateappointment(this.EditAppointment.value).subscribe(response => {
          console.log(response)
          this.getappointment()
        })
        this.EditAppointment.reset()
      }
      else {
        ValidateForm.validateAllFormFileds(this.EditAppointment);
        alert("Form is invalid");
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
  
    return dtFormatted < currentDateFormatted;

    
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





  serviceimg(url: string) {
    this.mailid = url
    console.log(this.mailid)
    
    this.image.getimage(url).subscribe(Res => {

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
    this.review.controls['servicecentermailid'].setValue(this.mailid)
    console.log(this.review.value)
    this.appointments.postreview(this.review.value).subscribe(response => {
      console.log(response);
      this.review.reset()
    });
  }


}
