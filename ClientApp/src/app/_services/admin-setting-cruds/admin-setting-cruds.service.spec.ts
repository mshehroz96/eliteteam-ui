/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminSettingCrudsService } from './admin-setting-cruds.service';

describe('Service: AdminSettingCruds', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSettingCrudsService]
    });
  });

  it('should ...', inject([AdminSettingCrudsService], (service: AdminSettingCrudsService) => {
    expect(service).toBeTruthy();
  }));
});
