import { TestBed } from '@angular/core/testing';

import { List2Service } from './list2.service';

describe('List2Service', () => {
  let service: List2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(List2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
