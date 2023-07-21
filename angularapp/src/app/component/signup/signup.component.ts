import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupButtonText:string="signup"
  SignupForm!: FormGroup;
  errormessage:string
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private share: ShareService) {

  }
  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      userRole: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      mobilenumber: ['',[Validators.required,Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmpassword: ['',Validators.required]
    }, {
      validator: this.passwordMatchValidator //using 'this' keyword to refer to instance method
    })
  }
  errpopup(){
    this.errormessage=""
  }
  onsignup() {

    if (this.SignupForm.valid) {
      this.signupButtonText = 'Loading...';
      const usertype = this.SignupForm.get('userRole')?.value
      const smail=this.SignupForm.get('email')?.value
      const spwd=this.SignupForm.get('password')?.value
      console.log(this.SignupForm.value);
      
      if (usertype === 'admin') {
        this.auth.adminsignup(this.SignupForm.value)
        .subscribe({
          next: (res => {
            localStorage.setItem("Semail",smail)
      localStorage.setItem("Spwd",spwd)
            this.SignupForm.reset();
            this.router.navigate(['login']);
          })
          , error: (err => {
            this.signupButtonText = 'signup'
            this.errormessage=err?.error.message
          })
        })
      }
      else {
        this.auth.usersignup(this.SignupForm.value)
          .subscribe({
            next: (res => {
              localStorage.setItem("Semail",smail)
              localStorage.setItem("Spwd",spwd)
              
              this.SignupForm.reset();
              this.router.navigate(['login']);
            })
            , error: (err => {
              this.signupButtonText = 'signup'
              this.errormessage=err?.error.message
            })
          })
      }


    }
    else {
      ValidateForm.validateAllFormFileds(this.SignupForm);
      this.errormessage="fill account details bellow"
    }


  }
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmpassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmpassword')?.setErrors(null);
    }
  }

}

