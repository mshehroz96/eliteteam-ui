import { TestBed } from '@angular/core/testing';

import { PaymentintegrationService } from './paymentintegration.service';

describe('PaymentintegrationService', () => {
  let service: PaymentintegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentintegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
