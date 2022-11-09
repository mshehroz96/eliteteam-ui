/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OwiRatingComponent } from './owi-rating.component';

describe('OwiRatingComponent', () => {
  let component: OwiRatingComponent;
  let fixture: ComponentFixture<OwiRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwiRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwiRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
