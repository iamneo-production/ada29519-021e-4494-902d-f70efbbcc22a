import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/helpers/account';

import ValidateForm from 'src/app/helpers/validateForm';
import { AccountService } from 'src/app/services/account.service';;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  userarr:Account[]=[]
  confirmpassword=''
  pwd=false
  isDropdownOpen = false;
  userForm!:FormGroup
  email=localStorage.getItem('Email')||""
  errormessage=''
  successmessage=''
  isNavbarTogglerActive = false;
  UserData:any
  constructor(private acc:AccountService,private router:Router,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.getaccount(this.email)
    this.userForm=this.fb.group({
      Email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      MobileNumber:['',[Validators.required,Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      UserName:['',[Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      UserRole:[''],
      Password:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmpassword:[''],
      UserId:['']
    }, {
      validator: this.passwordMatchValidator //using 'this' keyword to refer to instance method
    })
  }
  getaccount(email:string){
    this.acc.getAccount(email).subscribe(response => {
      this.userarr=response
    })
  }

  pwdchange(){
    this.pwd=!this.pwd
  }
  rollback(){
    this.pwd=false
  }
  delete(){
    this.acc.deleteAccount(this.userarr[0].userId).subscribe(res=>{})
    this.router.navigate(['/login'])
  }
  edit(){
    this.userForm.setValue({
      UserId:this.userarr[0].userId,
      UserName:this.userarr[0].userName,
      Email:this.userarr[0].email,
      MobileNumber:this.userarr[0].mobileNumber,
      UserRole:this.userarr[0].userRole,
      Password:localStorage.getItem('Password'),
      confirmpassword:localStorage.getItem('Password')
    })

  }
  reset(){
    this.userForm.reset()
  }
  update(){

    if(localStorage.getItem('Password')===this.userForm.get('Password')?.value){
      this.UserData={
      userId:this.userarr[0].userId,
      userName:this.userForm.get('UserName')?.value,
      email:this.userarr[0].email,
      mobileNumber:this.userForm.get('MobileNumber')?.value,
      userRole:this.userarr[0].userRole,
      password:localStorage.getItem('Password')||""
      }
    }
    else{
      this.userForm.setValue({
        UserId:this.userarr[0].userId,
        UserName:this.userarr[0].userName,
        Email:this.userarr[0].email,
        MobileNumber:this.userarr[0].mobileNumber,
        UserRole:this.userarr[0].userRole,
        Password:this.userForm.get('Password')?.value,
        confirmpassword:this.userForm.get('Password')?.value
      })

      this.UserData={
      userId:this.userarr[0].userId,
      userName:this.userarr[0].userName,
      email:this.userarr[0].email,
      mobileNumber:this.userarr[0].mobileNumber,
      userRole:this.userarr[0].userRole,
      password:this.userForm.get('Password')?.value
      }
    }
    if(this.userForm.valid){
      this.acc.editAccount(this.UserData).subscribe({
        next:(res)=>{
          this.getaccount(this.userForm.get('Email')?.value)
          this.successmessage=res.message
          setTimeout(() => {
            this.successmessage = '';
          }, 5000);
          this.userForm.reset()
          this.pwd=false
        },
        error:(err)=>{
          this.errormessage=err?.error.message
          setTimeout(() => {
            this.errormessage = '';
          }, 5000);
        }
        
      })
    }
    else{
      ValidateForm.validateAllFormFileds(this.userForm);
      this.errormessage="Enter Valid Details"
      setTimeout(() => {
        this.errormessage = '';
      }, 5000);
    }
  }
  Passwordchange(oldpwd:string){
    if(oldpwd===localStorage.getItem('Password')){
      
      this.update()
    }
    else{
      this.errormessage="Old Password Wrong"
      setTimeout(() => {
        this.errormessage = '';
      }, 5000);

    }
  }
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('Password')?.value;
    const confirmPassword = form.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmpassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmpassword')?.setErrors(null);
    }
  }  
  @HostListener('window:resize')
  onResize() {
    this.isNavbarTogglerActive = window.innerWidth <= 992;
  }

  toggleDropdown() {
    if (!this.isNavbarTogglerActive) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
  logout(){
    localStorage.clear()
  }
}

