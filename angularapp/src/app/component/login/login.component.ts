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
  errormessage:string=''
  successmessage=''

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
      Email: [storedEmail || '', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      Password: [storedPassword || '', Validators.required]
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
  

  onlogin() {
    if (this.LoginForm.valid) {
      this.loginButtonText = 'Loading...';
      console.log(this.LoginForm.value);
      const passwordValue = this.LoginForm.get('Password')?.value;
      const email = this.LoginForm.get('Email')?.value;
      console.log(email)
      console.log(passwordValue)
      localStorage.setItem('Email', email);
      localStorage.setItem('Password', passwordValue);
      if (passwordValue === 'admin') {
        this.auth.adminlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            this.successmessage=res.message
            setTimeout(() => {
              this.successmessage = '';
            }, 5000);
            this.router.navigate(['admin/dashboard']);
          },
          error: (err) => {
            this.loginButtonText = 'login';
           
            this.errormessage=err?.error.message
            setTimeout(() => {
              this.errormessage = '';
            }, 5000);
            

            // this.toast.error({detail:"ERROR",summary:err?.error.message,sticky:true});
          }
        });
      } else {
        this.auth.userlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            this.successmessage=res.message
            setTimeout(() => {
              this.successmessage = '';
            }, 5000);
            if(res.userRole==='user')
            {
              this.auth.setuser('user')
              this.router.navigate(['user/homepage']);
            }
            else{
              this.auth.setadmin('admin')
              this.router.navigate(['admin/dashboard']);
            }
              

          },
          error: (err) => {
            this.loginButtonText = 'login';
            console.log(err)
            this.errormessage=err?.error.message;
            setTimeout(() => {
              this.errormessage = '';
            }, 5000);


            // this.toast.error({detail:"ERROR",summary:err?.error.message,sticky:true});
          }
        });
      }
    } else {
      if(this.LoginForm.pristine){
        this.errormessage='Enter your email and password'
        setTimeout(() => {
          this.errormessage = '';
        }, 5000);
      }
      else{
        ValidateForm.validateAllFormFileds(this.LoginForm);
      this.errormessage='Enter valid email and password'
      setTimeout(() => {
        this.errormessage = '';
      }, 5000);
      }
      
    }
  }
}