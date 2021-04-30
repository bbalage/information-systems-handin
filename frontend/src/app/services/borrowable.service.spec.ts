import { TestBed } from '@angular/core/testing';

import { BorrowableService } from './borrowable.service';

describe('BorrowableService', () => {
  let service: BorrowableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
