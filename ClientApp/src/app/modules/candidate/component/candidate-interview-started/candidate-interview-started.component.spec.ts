import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInterviewStartedComponent } from './candidate-interview-started.component';

describe('CandidateInterviewStartedComponent', () => {
  let component: CandidateInterviewStartedComponent;
  let fixture: ComponentFixture<CandidateInterviewStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateInterviewStartedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateInterviewStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
