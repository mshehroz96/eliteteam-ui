import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateOverview2Component } from './candidate-overview2.component';

describe('CandidateOverviewComponent', () => {
  let component: CandidateOverview2Component;
  let fixture: ComponentFixture<CandidateOverview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateOverview2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateOverview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
