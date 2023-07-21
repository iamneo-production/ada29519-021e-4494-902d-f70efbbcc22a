<<<<<<< HEAD
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
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

<<<<<<< HEAD
  loginButtonText: string = 'login';
=======
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
  LoginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    const storedEmail = localStorage.getItem('Semail');
    const storedPassword = localStorage.getItem('Spwd');
=======
    const storedEmail = localStorage.getItem('semail');
    const storedPassword = localStorage.getItem('spassword');
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
    this.LoginForm = this.fb.group({
      email: [storedEmail || '', [Validators.email, Validators.required]],
      password: [storedPassword || '', Validators.required]
    });

    if (storedEmail && storedPassword) {
      setTimeout(() => {
        const loginButton = this.elRef.nativeElement.querySelector('#loginButton');
        loginButton.click(); 
<<<<<<< HEAD
        localStorage.removeItem('Semail')
        localStorage.removeItem('Spwd')
=======
        localStorage.removeItem('semail')
        localStorage.removeItem('spassword')
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
      });
    }
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
<<<<<<< HEAD
            this.router.navigate(['admin/admindashboard']);
=======
            alert(res.message);
            this.router.navigate(['admin']);
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
          },
          error: (err) => {
            this.loginButtonText = 'login';
            alert(err?.error.message);
          }
        });
      } else {
        this.auth.userlogin(this.LoginForm.value).subscribe({
          next: (res) => {
<<<<<<< HEAD
=======
            alert(res.message);
>>>>>>> d0569e4f3a0fc1311b5f2bfdf431ff18b4694f3e
            this.router.navigate(['user']);
          },
          error: (err) => {
            this.loginButtonText = 'login';
            alert(err?.error.message);
          }
        });
      }
    } else {
      ValidateForm.validateAllFormFileds(this.LoginForm);
      alert('Form is invalid');
    }
  }
}