import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantOverviewComponent } from './applicant-overview.component';

describe('ApplicantOverviewComponent', () => {
  let component: ApplicantOverviewComponent;
  let fixture: ComponentFixture<ApplicantOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
