import { TestBed } from '@angular/core/testing';

import { RequisitionFeedbackService } from './requisition-feedback.service';

describe('RequisitionFeedbackService', () => {
  let service: RequisitionFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitionFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
