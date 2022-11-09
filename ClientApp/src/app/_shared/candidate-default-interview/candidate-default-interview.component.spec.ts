import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDefaultInterviewComponent } from './candidate-default-interview.component';

describe('CandidateDefaultInterviewComponent', () => {
  let component: CandidateDefaultInterviewComponent;
  let fixture: ComponentFixture<CandidateDefaultInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateDefaultInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateDefaultInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
