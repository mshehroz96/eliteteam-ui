/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatUsersService } from './chat-users.service';

describe('Service: ChatUsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatUsersService]
    });
  });

  it('should ...', inject([ChatUsersService], (service: ChatUsersService) => {
    expect(service).toBeTruthy();
  }));
});
