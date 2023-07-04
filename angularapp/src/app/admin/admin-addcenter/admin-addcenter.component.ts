import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-addcenter',
  templateUrl: './admin-addcenter.component.html',
  styleUrls: ['./admin-addcenter.component.css']
})
export class AdminAddcenterComponent {
  addCenterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addCenterForm = this.formBuilder.group({
      centerName: ['', Validators.required],
      centerDescription: ['', Validators.required],
      centerLocation: ['', Validators.required],
      centerContact: ['', Validators.required],
      centerWebsite: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.addCenterForm.value);
  }
}
