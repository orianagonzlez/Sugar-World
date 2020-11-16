import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodViewComponent } from './method-view.component';

describe('MethodViewComponent', () => {
  let component: MethodViewComponent;
  let fixture: ComponentFixture<MethodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
