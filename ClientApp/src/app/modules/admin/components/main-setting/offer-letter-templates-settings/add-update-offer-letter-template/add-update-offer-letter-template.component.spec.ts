/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddUpdateOfferLetterTemplateComponent } from './add-update-offer-letter-template.component';

describe('AddUpdateOfferLetterTemplateComponent', () => {
  let component: AddUpdateOfferLetterTemplateComponent;
  let fixture: ComponentFixture<AddUpdateOfferLetterTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateOfferLetterTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOfferLetterTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
