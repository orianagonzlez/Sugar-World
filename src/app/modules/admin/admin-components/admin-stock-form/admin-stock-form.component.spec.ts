import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockFormComponent } from './admin-stock-form.component';

describe('AdminStockFormComponent', () => {
  let component: AdminStockFormComponent;
  let fixture: ComponentFixture<AdminStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
