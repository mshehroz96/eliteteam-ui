/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReAssignRequisitionRecruitersComponent } from './re-assign-requisition-recruiters.component';

describe('ReAssignRequisitionRecruitersComponent', () => {
  let component: ReAssignRequisitionRecruitersComponent;
  let fixture: ComponentFixture<ReAssignRequisitionRecruitersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAssignRequisitionRecruitersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAssignRequisitionRecruitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
