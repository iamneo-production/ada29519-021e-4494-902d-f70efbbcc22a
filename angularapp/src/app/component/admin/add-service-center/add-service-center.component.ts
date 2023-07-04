import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-service-center',
  templateUrl: './add-service-center.component.html',
  styleUrls: ['./add-service-center.component.css']
})
export class AddServiceCenterComponent implements OnInit{

  AddserviceButtonText:string="add"
  addCenter!:FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){

  }
  ngOnInit(): void {
    const randomstring=this.generateRandomString(10)
    this.addCenter=this.fb.group({
      serviceCenterID:[randomstring],
      serviceCenterName:['',Validators.required],
      serviceCenterPhone:['',Validators.required],
      serviceCenterAddress:['',Validators.required],
      serviceCenterImageUrl:['',Validators.required],
      serviceCenteramailId:['',Validators.email],
      serviceCenterDescription:['',Validators.required]
    })
  }
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  }
  
  onadd(){
    if(this.addCenter.valid){
      this.AddserviceButtonText="loading..."
      console.log(this.addCenter.value);
      this.auth.addCenterDB(this.addCenter.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.addCenter.reset();
          this.router.navigate(['admin/editServiceCenter'])
        })
        ,error:(err=>{
          this.AddserviceButtonText="add"
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