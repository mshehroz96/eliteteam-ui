import { TestBed } from '@angular/core/testing';

import { ScreeningQuestionService as ScreeningQuestionService } from './screening-question.service';

describe('ScreeningQuestionService', () => {
  let service: ScreeningQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreeningQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
