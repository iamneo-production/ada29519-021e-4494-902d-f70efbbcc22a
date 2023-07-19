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

<<<<<<< HEAD
  signupButtonText: string = "signup"
  SignupForm!: FormGroup;
  errormessage: string = ''
  successmessage = ''

=======
  signupButtonText:string="signup"
  SignupForm!: FormGroup;
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private share: ShareService) {

  }
  ngOnInit(): void {
    this.SignupForm = this.fb.group({
<<<<<<< HEAD
      UserRole: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      UserName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      MobileNumber: ['', [Validators.required, Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      Password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
=======
      userRole: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      password: ['', Validators.required],
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
      confirmpassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator //using 'this' keyword to refer to instance method
    })
  }
<<<<<<< HEAD

=======
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
  onsignup() {

    if (this.SignupForm.valid) {
      this.signupButtonText = 'Loading...';
<<<<<<< HEAD
      const usertype = this.SignupForm.get('UserRole')?.value
      const smail = this.SignupForm.get('Email')?.value
      const spwd = this.SignupForm.get('Password')?.value
      const signupData = {
        UserRole: usertype,
        Email: smail,
        UserName: this.SignupForm.get('UserName')?.value,
        MobileNumber: this.SignupForm.get('MobileNumber')?.value,
        Password: spwd
      };

      if (usertype === 'admin') {
        this.auth.adminsignup(signupData)
          .subscribe({
            next: (res => {
              localStorage.setItem("Semail", smail)
              localStorage.setItem("Spwd", spwd)
              this.SignupForm.reset();
              this.router.navigate(['login']);
            })
            , error: (err => {
              this.signupButtonText = 'signup'
              this.errormessage = err?.error.message
              setTimeout(() => {
                this.errormessage = '';
              }, 5000);
            })
          })
      }
      else {
        this.auth.usersignup(signupData)
        
          .subscribe({
            next: (res => {
              localStorage.setItem("Semail", smail)
              localStorage.setItem("Spwd", spwd)

=======
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
            alert(err?.error.message)
          })
        })
      }
      else {
        this.auth.usersignup(this.SignupForm.value)
          .subscribe({
            next: (res => {
              localStorage.setItem("Semail",smail)
      localStorage.setItem("Spwd",spwd)
              
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
              this.SignupForm.reset();
              this.router.navigate(['login']);
            })
            , error: (err => {
              this.signupButtonText = 'signup'
<<<<<<< HEAD
              this.errormessage = err?.error.message
              setTimeout(() => {
                this.errormessage = '';
              }, 5000);
=======
              alert(err?.error.message)
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
            })
          })
      }


    }
    else {
      ValidateForm.validateAllFormFileds(this.SignupForm);
<<<<<<< HEAD
      this.errormessage = 'Enter valid Details'
      setTimeout(() => {
        this.errormessage = '';
      }, 5000);
=======
      alert("Form is invalid");
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
    }


  }
  private passwordMatchValidator(form: FormGroup) {
<<<<<<< HEAD
    const password = form.get('Password')?.value;
=======
    const password = form.get('password')?.value;
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
    const confirmPassword = form.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmpassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmpassword')?.setErrors(null);
    }
  }

<<<<<<< HEAD
}
=======
}



>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba
