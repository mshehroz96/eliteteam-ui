import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateBasicInfoComponent } from './candidate-basic-info.component';

describe('CandidateBasicInfoComponent', () => {
  let component: CandidateBasicInfoComponent;
  let fixture: ComponentFixture<CandidateBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateBasicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
