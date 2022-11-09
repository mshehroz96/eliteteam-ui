import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterAssignmentDetailsComponent } from './recruiter-assignment-details.component';

describe('RecruiterAssignmentDetailsComponent', () => {
  let component: RecruiterAssignmentDetailsComponent;
  let fixture: ComponentFixture<RecruiterAssignmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterAssignmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
