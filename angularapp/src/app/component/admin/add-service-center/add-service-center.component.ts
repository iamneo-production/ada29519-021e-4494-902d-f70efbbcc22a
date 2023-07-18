import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-service-center',
  templateUrl: './add-service-center.component.html',
  styleUrls: ['./add-service-center.component.css']
})
export class AddServiceCenterComponent implements OnInit {

  AddserviceButtonText: string = "add"
  addCenter!: FormGroup;
  successmessage: string = ''
  errormessage: string = ''

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

  }
  ngOnInit(): void {

    this.addCenter = this.fb.group({

      serviceCenterName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      serviceCenterPhone: ['', [Validators.required, Validators.pattern(/^(?!([0-9])\1{9}$)\d{10}$/)]],
      serviceCenterAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,#\\-]+$')]],
      serviceCenterImageUrl: ['', Validators.required],
      serviceCenteramailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      serviceCenterDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9,.\\s\\/]+$')]]
    })
  }
  errpopup() {
    this.errormessage = ""
  }

  onadd() {
    if (this.addCenter.valid) {
      this.AddserviceButtonText = "loading..."
      console.log(this.addCenter.value);
      this.auth.addCenterDB(this.addCenter.value)
        .subscribe({
          next: (res => {
            this.successmessage = res.message
            this.addCenter.reset();
            this.router.navigate(['admin/editServiceCenter'])
          })
          , error: (err => {
            this.AddserviceButtonText = "add"
            this.errormessage = err?.error.message
            setTimeout(() => {
              this.errormessage = '';
            }, 5000);
          })
        })

    }
    else {
      if (this.addCenter.pristine) {
        this.errormessage = 'Fill the service center details'
        setTimeout(() => {
          this.errormessage = '';
        }, 5000);
      }
      else if (this.addCenter.invalid) {

        ValidateForm.validateAllFormFileds(this.addCenter);
        this.errormessage = 'Fill the valid details'
        setTimeout(() => {
          this.errormessage = '';
        }, 5000);
      }
    }
  }
  showFieldErrors() {
    Object.keys(this.addCenter.controls).forEach((key) => {
      this.addCenter.get(key)?.markAsTouched();
    });
  }
  

}