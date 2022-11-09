import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsInactiveComponent } from './jobs-inactive.component';

describe('JobsInactiveComponent', () => {
  let component: JobsInactiveComponent;
  let fixture: ComponentFixture<JobsInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsInactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
