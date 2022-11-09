/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommunicationTemplatesService } from './communication-templates.service';

describe('Service: CommunicationTemplates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicationTemplatesService]
    });
  });

  it('should ...', inject([CommunicationTemplatesService], (service: CommunicationTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
