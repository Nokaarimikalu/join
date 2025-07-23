import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacySignInComponent } from './privacy-sign-in.component';

describe('PrivacySignInComponent', () => {
  let component: PrivacySignInComponent;
  let fixture: ComponentFixture<PrivacySignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacySignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacySignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
