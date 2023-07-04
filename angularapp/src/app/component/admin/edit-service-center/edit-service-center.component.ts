import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { serviceCenter } from 'src/app/helpers/serviceCenter';
import ValidateForm from 'src/app/helpers/validateForm';
import { ServicecenterService } from 'src/app/services/servicecenter.service';

@Component({
  selector: 'app-edit-service-center',
  templateUrl: './edit-service-center.component.html',
  styleUrls: ['./edit-service-center.component.css']
})
export class EditServiceCenterComponent implements OnInit {
  servicesarr: serviceCenter[] = [];
  editCenter!: FormGroup
  constructor(private fb: FormBuilder, private services: ServicecenterService) {
    this.editCenter = this.fb.group({
      serviceCenterID: ['',Validators.required],
      serviceCenterName: ['',Validators.required],
      serviceCenterPhone: ['',Validators.required],
      serviceCenterAddress: ['',Validators.required],
      serviceCenterImageUrl: ['',Validators.required],
      serviceCenteramailId: ['',Validators.required],
      serviceCenterDescription: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.getservice();
  }
  getservice() {
    this.services.getService().subscribe(Response => {
      console.log(Response)
      this.servicesarr = Response;
    })
  }
  updateform(ser: serviceCenter) {
    console.log(ser)
    this.editCenter.setValue({
      serviceCenterID: ser.serviceCenterID,
      serviceCenterName: ser.serviceCenterName,
      serviceCenterPhone: ser.serviceCenterPhone,
      serviceCenterAddress: ser.serviceCenterAddress,
      serviceCenterImageUrl: ser.serviceCenterImageUrl,
      serviceCenteramailId: ser.serviceCenteramailId,
      serviceCenterDescription: ser.serviceCenterDescription
    })
  }
  onedit() {
    if (this.editCenter.valid) {
      this.services.updateservice(this.editCenter.value).subscribe(Response => {
        this.getservice();
      });
    } else {
      ValidateForm.validateAllFormFileds(this.editCenter);
      alert("Form is invalid");
    }
  }


  ondelete(id: string) {
    console.log(id)
    this.services.deleteservice(id).subscribe((res: any) => {
      console.log(res);
      this.getservice();
    });
  }
}