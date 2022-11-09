import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobDetailComponent } from './candidate-job-detail.component';

describe('CandidateJobDetailComponent', () => {
  let component: CandidateJobDetailComponent;
  let fixture: ComponentFixture<CandidateJobDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateJobDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
