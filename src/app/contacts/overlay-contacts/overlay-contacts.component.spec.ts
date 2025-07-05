import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContactsComponent } from './overlay-contacts.component';

describe('OverlayContactsComponent', () => {
  let component: OverlayContactsComponent;
  let fixture: ComponentFixture<OverlayContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
