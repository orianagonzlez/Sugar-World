import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMethodFormComponent } from './admin-method-form.component';

describe('AdminMethodFormComponent', () => {
  let component: AdminMethodFormComponent;
  let fixture: ComponentFixture<AdminMethodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMethodFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMethodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
