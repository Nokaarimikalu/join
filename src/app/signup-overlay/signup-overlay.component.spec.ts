import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOverlayComponent } from './signup-overlay.component';

describe('SignupOverlayComponent', () => {
  let component: SignupOverlayComponent;
  let fixture: ComponentFixture<SignupOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
