import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBagViewComponent } from './current-bag-view.component';

describe('CurrentBagViewComponent', () => {
  let component: CurrentBagViewComponent;
  let fixture: ComponentFixture<CurrentBagViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBagViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBagViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
