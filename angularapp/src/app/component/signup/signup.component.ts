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

  SignupForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private share: ShareService) {

  }
  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      userRole: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator //using 'this' keyword to refer to instance method
    })
  }
  onsignup() {

    if (this.SignupForm.valid) {
      const usertype = this.SignupForm.get('userRole')?.value
      console.log(this.SignupForm.value);
      if (usertype === 'admin') {
        this.auth.adminsignup(this.SignupForm.value)
        .subscribe({
          next: (res => {
            alert(res.message)
            this.SignupForm.reset();
            this.router.navigate(['login']);
          })
          , error: (err => {
            alert(err?.error.message)
          })
        })
      }
      else {
        this.auth.usersignup(this.SignupForm.value)
          .subscribe({
            next: (res => {
              alert(res.message)
              this.SignupForm.reset();
              this.router.navigate(['login']);
            })
            , error: (err => {
              alert(err?.error.message)
            })
          })
      }


    }
    else {
      ValidateForm.validateAllFormFileds(this.SignupForm);
      alert("Form is invalid");
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



