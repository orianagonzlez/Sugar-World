import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderFormComponent } from './admin-order-form.component';

describe('AdminOrderFormComponent', () => {
  let component: AdminOrderFormComponent;
  let fixture: ComponentFixture<AdminOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
