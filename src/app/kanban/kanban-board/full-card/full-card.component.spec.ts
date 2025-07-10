import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCardComponent } from './full-card.component';

describe('FullCardComponent', () => {
  let component: FullCardComponent;
  let fixture: ComponentFixture<FullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
