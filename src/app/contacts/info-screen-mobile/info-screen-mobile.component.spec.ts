import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoScreenMobileComponent } from './info-screen-mobile.component';

describe('InfoScreenMobileComponent', () => {
  let component: InfoScreenMobileComponent;
  let fixture: ComponentFixture<InfoScreenMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoScreenMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoScreenMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
