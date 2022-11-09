/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReAssignRequisitionRecruitersClientsComponent } from './re-assign-requisition-recruiters-clients.component';

describe('ReAssignRequisitionRecruitersClientsComponent', () => {
  let component: ReAssignRequisitionRecruitersClientsComponent;
  let fixture: ComponentFixture<ReAssignRequisitionRecruitersClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAssignRequisitionRecruitersClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAssignRequisitionRecruitersClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
