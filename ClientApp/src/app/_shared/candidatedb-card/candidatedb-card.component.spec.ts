import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDBCardComponent } from './candidatedb-card.component';

describe('CandidateDBCardComponent', () => {
  let component: CandidateDBCardComponent;
  let fixture: ComponentFixture<CandidateDBCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateDBCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateDBCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
