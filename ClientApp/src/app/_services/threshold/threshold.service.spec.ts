/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThresholdService } from './threshold.service';

describe('Service: Threshold', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThresholdService]
    });
  });

  it('should ...', inject([ThresholdService], (service: ThresholdService) => {
    expect(service).toBeTruthy();
  }));
});
