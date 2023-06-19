import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-admin-centerprofile',
  templateUrl: './admin-centerprofile.component.html',
  styleUrls: ['./admin-centerprofile.component.css']
})
export class AdminCenterprofileComponent {
  centers: Center[] = [
    { id: 1, name: 'Center A', address: '123 Main St', phone: '555-1234', email: 'centera@example.com' },
    { id: 2, name: 'Center B', address: '456 Oak St', phone: '555-5678', email: 'centerb@example.com' },
    { id: 3, name: 'Center C', address: '789 Pine St', phone: '555-9012', email: 'centerc@example.com' }
  ];
  editForm: FormGroup;
  deleteId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      centerName: ['', Validators.required],
      address: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNumber: ['', Validators.required],
      services: this.fb.array([])
    });
  }

  onSubmit(): void {
    const id = this.editForm.get('id')?.value;
    const centerIndex = this.centers.findIndex(center => center.id === id);
    this.centers[centerIndex].name = this.editForm.get('centerName')?.value;
    this.centers[centerIndex].address = this.editForm.get('address')?.value;
    this.centers[centerIndex].phone = this.editForm.get('contactNumber')?.value;
    this.centers[centerIndex].email = this.editForm.get('contactPerson')?.value;
    this.editForm.reset();
  }


  onEdit(center: Center): void {
    this.editForm.patchValue({
      id: center.id,
      centerName: center.name,
      address: center.address,
      contactNumber: center.phone,
      contactPerson: center.email
    });
  }


  onDelete(center: Center) {
    if (confirm("Are you sure you want to delete this center?")) {
      const index = this.centers.indexOf(center);
      this.centers.splice(index, 1);
    }
  }

  onDeleteConfirm(): void {
    const centerIndex = this.centers.findIndex(center => center.id === this.deleteId);
    this.centers.splice(centerIndex, 1);
    this.deleteId = null;
  }

  onDeleteCancel(): void {
    this.deleteId = null;
  }
}
