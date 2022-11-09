import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFeedbackComponent } from './job-feedback.component';

describe('JobFeedbackComponent', () => {
  let component: JobFeedbackComponent;
  let fixture: ComponentFixture<JobFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
