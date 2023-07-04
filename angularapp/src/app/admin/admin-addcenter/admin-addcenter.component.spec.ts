import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcenterComponent } from './admin-addcenter.component';

describe('AdminAddcenterComponent', () => {
  let component: AdminAddcenterComponent;
  let fixture: ComponentFixture<AdminAddcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
