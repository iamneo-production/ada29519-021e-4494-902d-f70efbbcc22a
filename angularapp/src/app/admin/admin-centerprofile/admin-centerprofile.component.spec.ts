import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCenterprofileComponent } from './admin-centerprofile.component';

describe('AdminCenterprofileComponent', () => {
  let component: AdminCenterprofileComponent;
  let fixture: ComponentFixture<AdminCenterprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCenterprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCenterprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
