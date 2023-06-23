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

  LoginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('semail');
    const storedPassword = localStorage.getItem('spassword');
    this.LoginForm = this.fb.group({
      email: [storedEmail || '', [Validators.email, Validators.required]],
      password: [storedPassword || '', Validators.required]
    });

    if (storedEmail && storedPassword) {
      setTimeout(() => {
        const loginButton = this.elRef.nativeElement.querySelector('#loginButton');
        loginButton.click(); 
        localStorage.removeItem('semail')
        localStorage.removeItem('spassword')
      });
    }
  }

  onlogin() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      const passwordValue = this.LoginForm.get('password')?.value;
      const email = this.LoginForm.get('email')?.value;
      localStorage.setItem('email', email);
      if (passwordValue === 'admin') {
        this.auth.adminlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            alert(res.message);
            this.router.navigate(['admin']);
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
      } else {
        this.auth.userlogin(this.LoginForm.value).subscribe({
          next: (res) => {
            alert(res.message);
            this.router.navigate(['user']);
          },
          error: (err) => {
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
