import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-service-center',
  templateUrl: './add-service-center.component.html',
  styleUrls: ['./add-service-center.component.css']
})
export class AddServiceCenterComponent implements OnInit {
   
  addCenter!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService) { }

  ngOnInit(): void {
    this.addCenter=this.fb.group({
      serviceCenterName:['',Validators.required],
      serviceCenterPhone:['',Validators.required],
      serviceCenterAddress:['',Validators.required],
      serviceCenterImageUrl:['',Validators.required],
      serviceCenteramailId:['',Validators.email],
      serviceCenterDescription:['',Validators.required]
    })
  }
  // onadd(){
  //   console.log(this.addCenter.value)
  // }
  onadd(){
    if(this.addCenter.valid){
      console.log(this.addCenter.value);
      this.auth.addCenterDB(this.addCenter.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.addCenter.reset();
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })

    }
    else{
      ValidateForm.validateAllFormFileds(this.addCenter);
      alert("Form is invalid");
    }
  }

}

  
