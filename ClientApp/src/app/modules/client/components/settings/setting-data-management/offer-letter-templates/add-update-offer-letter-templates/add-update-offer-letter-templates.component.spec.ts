/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddUpdateOfferLetterTemplatesComponent } from './add-update-offer-letter-templates.component';

describe('AddUpdateOfferLetterTemplatesComponent', () => {
  let component: AddUpdateOfferLetterTemplatesComponent;
  let fixture: ComponentFixture<AddUpdateOfferLetterTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateOfferLetterTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateOfferLetterTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
