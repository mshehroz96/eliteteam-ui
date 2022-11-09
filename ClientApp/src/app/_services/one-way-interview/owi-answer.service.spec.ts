/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OwiAnswerService } from './owi-answer.service';

describe('Service: OwiAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwiAnswerService]
    });
  });

  it('should ...', inject([OwiAnswerService], (service: OwiAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
