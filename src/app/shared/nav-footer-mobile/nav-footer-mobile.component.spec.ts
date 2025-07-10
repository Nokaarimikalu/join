import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFooterMobileComponent } from './nav-footer-mobile.component';

describe('NavFooterMobileComponent', () => {
  let component: NavFooterMobileComponent;
  let fixture: ComponentFixture<NavFooterMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavFooterMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFooterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
