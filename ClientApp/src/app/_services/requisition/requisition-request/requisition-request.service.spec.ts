import { TestBed } from '@angular/core/testing';

import { RequisitionRequestService } from './requisition-request.service';

describe('RequisitionRequestService', () => {
  let service: RequisitionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
