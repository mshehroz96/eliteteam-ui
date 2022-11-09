/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddUpdateRecruiterSchedulesComponent } from './add-update-recruiter-schedules.component';

describe('AddUpdateRecruiterSchedulesComponent', () => {
  let component: AddUpdateRecruiterSchedulesComponent;
  let fixture: ComponentFixture<AddUpdateRecruiterSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateRecruiterSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateRecruiterSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
