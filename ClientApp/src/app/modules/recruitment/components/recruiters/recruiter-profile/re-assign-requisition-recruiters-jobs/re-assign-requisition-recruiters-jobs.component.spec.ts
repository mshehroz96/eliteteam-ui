/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReAssignRequisitionRecruitersJobsComponent } from './re-assign-requisition-recruiters-jobs.component';

describe('ReAssignRequisitionRecruitersJobsComponent', () => {
  let component: ReAssignRequisitionRecruitersJobsComponent;
  let fixture: ComponentFixture<ReAssignRequisitionRecruitersJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAssignRequisitionRecruitersJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAssignRequisitionRecruitersJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
