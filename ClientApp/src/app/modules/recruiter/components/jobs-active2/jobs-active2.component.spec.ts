import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsActive2Component } from './jobs-active2.component';

describe('JobsActive2Component', () => {
  let component: JobsActive2Component;
  let fixture: ComponentFixture<JobsActive2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsActive2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsActive2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
