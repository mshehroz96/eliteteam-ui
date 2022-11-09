import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalCandidateProfileComponent } from './external-candidate-profile.component';

describe('ExternalCandidateProfileComponent', () => {
  let component: ExternalCandidateProfileComponent;
  let fixture: ComponentFixture<ExternalCandidateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalCandidateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalCandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
