import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetails2Component } from './job-details2.component';

describe('JobDetails2Component', () => {
  let component: JobDetails2Component;
  let fixture: ComponentFixture<JobDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
