import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoticeSignInComponent } from './legal-notice-sign-in.component';

describe('LegalNoticeSignInComponent', () => {
  let component: LegalNoticeSignInComponent;
  let fixture: ComponentFixture<LegalNoticeSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeSignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalNoticeSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
