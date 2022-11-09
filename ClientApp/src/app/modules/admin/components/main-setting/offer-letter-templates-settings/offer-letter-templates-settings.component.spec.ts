/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfferLetterTemplatesSettingsComponent } from './offer-letter-templates-settings.component';

describe('OfferLetterTemplatesSettingsComponent', () => {
  let component: OfferLetterTemplatesSettingsComponent;
  let fixture: ComponentFixture<OfferLetterTemplatesSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferLetterTemplatesSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferLetterTemplatesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
