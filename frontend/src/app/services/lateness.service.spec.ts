import { TestBed } from '@angular/core/testing';

import { LatenessService } from './lateness.service';

describe('LatenessService', () => {
  let service: LatenessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatenessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
