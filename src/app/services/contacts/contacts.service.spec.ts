import { TestBed } from '@angular/core/testing';

import { OverlayState } from './overlayState.service';

describe('overlayState', () => {
  let service: OverlayState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
