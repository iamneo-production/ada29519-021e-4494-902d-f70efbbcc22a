import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import sharing from 'src/app/helpers/validateForm';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/helpers/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  AppointmentArr:Appointment[]=[]

  EditAppointment!:FormGroup
  availableSlots: any[] = [];
  existingAppointments :Appointment[]=[]
  serviceName: string='';
  constructor(private appointments: AppointmentService,private fb:FormBuilder,private share:ShareService) {}

  ngOnInit(): void {

    this.EditAppointment= this.fb.group({
      id:[""],
      productName: ['', Validators.required],
      productModelNo: ['', Validators.required],
      dateOfPurchase: ['', Validators.required],
      contactNumber: ['', Validators.required],
      problemDescription: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      maildid:this.share.Mailid,
      servicecenter:['']
      
      
     });
     this.serviceName = this.share.serviceName;
    this.getappointment()
    this.generateAvailableSlots()
    this.appointments.getExistingAppointments().subscribe(existingAppointments => {
      this.existingAppointments = existingAppointments;
      // Mark the corresponding time slots as booked
    this.availableSlots.forEach(slot => {
      slot.times.forEach((timeSlot: { time: string; isBooked: boolean; }) => {
        const isBooked = existingAppointments.some(appointment =>appointment.servicecenter===this.serviceName&&
          appointment.date === slot.date && appointment.time === timeSlot.time
        );
        timeSlot.isBooked = isBooked;
      });
    });
  });
  }
  getappointment(){
    this.appointments.getappointment().subscribe(response=>{
      console.log(response);
      this.AppointmentArr=response;
      // this.getappointment()
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
fillappointment(app:Appointment){
  
  console.log(app.servicecenter)
  this.EditAppointment.setValue({
    id:app.id,
    productName:app.productName,
    productModelNo:app.productModelNo,
    dateOfPurchase:app.dateOfPurchase,
    contactNumber:app.contactNumber,
    problemDescription: app.problemDescription,
    time: app.time,
    date: app.date,
    maildid:app.maildid,
    servicecenter:app.servicecenter
  })

}
deleteappointment(Id:number){
this.appointments.cancelappointment(Id).subscribe(res=>{
  console.log(res)
  this.getappointment()
})
}

  Update(){
    const selectedDate = this.EditAppointment.controls['date'].value;
  const selectedTime = this.EditAppointment.controls['time'].value;

  const isSlotBooked = this.existingAppointments.some(appointment => appointment.servicecenter===this.serviceName &&
    appointment.date === selectedDate && appointment.time === selectedTime
  );

  if (isSlotBooked) {
    // Display an error message or handle the booking attempt accordingly
    console.log('Selected slot is already booked');
  }else{
    this.appointments.updateappointment(this.EditAppointment.value).subscribe(response=>{
      console.log(response)
      this.getappointment()
    })
  }
  }
}
