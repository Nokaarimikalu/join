import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoScreenComponent } from './info-screen.component';

describe('InfoScreenComponent', () => {
  let component: InfoScreenComponent;
  let fixture: ComponentFixture<InfoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
