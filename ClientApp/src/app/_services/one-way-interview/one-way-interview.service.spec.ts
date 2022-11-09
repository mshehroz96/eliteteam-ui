import { TestBed } from '@angular/core/testing';

import { OneWayInterviewService } from './one-way-interview.service';

describe('OneWayInterviewService', () => {
  let service: OneWayInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneWayInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
