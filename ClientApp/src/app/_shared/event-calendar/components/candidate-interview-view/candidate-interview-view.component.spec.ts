import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInterviewViewComponent } from './candidate-interview-view.component';

describe('CandidateInterviewViewComponent', () => {
  let component: CandidateInterviewViewComponent;
  let fixture: ComponentFixture<CandidateInterviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateInterviewViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateInterviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
