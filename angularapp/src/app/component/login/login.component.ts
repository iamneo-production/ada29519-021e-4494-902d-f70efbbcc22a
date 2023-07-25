import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loginButton!: ElementRef;

  loginButtonText: string = 'login';
  LoginForm!: FormGroup;
  errormessage:string
  username:string=''
  role=''
  pwd=false
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private elRef: ElementRef,
   
  ) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('Semail');
    const storedPassword = localStorage.getItem('Spwd');
    this.LoginForm = this.fb.group({
      email: [storedEmail || '', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: [storedPassword || '', Validators.required]
    });

    if (storedEmail && storedPassword) {
      setTimeout(() => {
        const loginButton = this.elRef.nativeElement.querySelector('#loginButton');
        loginButton.click(); 
        localStorage.removeItem('Semail')
        localStorage.removeItem('Spwd')
      });
    }
  }
  errpopup(){
    this.errormessage=""
  }

  onlogin() {
    if (this.LoginForm.valid) {
      this.loginButtonText = 'Loading...';
      console.log(this.LoginForm.value);
      const passwordValue = this.LoginForm.get('password')?.value;
      const email = this.LoginForm.get('email')?.value;
      localStorage.setItem('email', email);
      if (passwordValue === 'admin') {
        this.auth.adminlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            this.router.navigate(['admin/dashboard']);
          },
          error: (err) => {
            this.loginButtonText = 'login';
            alert(err?.error.message);
            this.errormessage=err?.error.message
            

            // this.toast.error({detail:"ERROR",summary:err?.error.message,sticky:true});
          }
        });
      } else {
        this.auth.userlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            console.log(res)
            this.username=res.userName
            localStorage.setItem("username",res.userName)
            if(res.userRole==='user'){
              this.router.navigate(['user/homepage']);
              this.auth.storeuser('user')
              
            }
              
            else{
              this.router.navigate(['admin/dashboard']);
              this.auth.storeadmin('admin')
              
            }
              
            

          },
          error: (err) => {
            this.loginButtonText = 'login';
            this.errormessage=err?.error.message;
            this.errormessage=err?.error.message


            // this.toast.error({detail:"ERROR",summary:err?.error.message,sticky:true});
          }
        });
      }
    } else {
      if(this.LoginForm.pristine){
        this.errormessage='Enter your email and password'
      }
      else{
        ValidateForm.validateAllFormFileds(this.LoginForm);
      this.errormessage='Enter valid email and password'
      }
      
    }
  }
  user(){
    if(this.role==="user"){
      return localStorage.setItem('userpresent','user')
    }
    else{
      return localStorage.setItem('adminpresent','admin')
    }
  }
  togglePasswordVisibility() {
    this.pwd = !this.pwd;
  }
}