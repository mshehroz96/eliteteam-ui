import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPendingComponent } from './jobs-pending.component';

describe('JobsPendingComponent', () => {
  let component: JobsPendingComponent;
  let fixture: ComponentFixture<JobsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
