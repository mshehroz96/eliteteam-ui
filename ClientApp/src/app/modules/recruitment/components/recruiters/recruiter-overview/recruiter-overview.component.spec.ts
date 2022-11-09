import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterOverviewComponent } from './recruiter-overview.component';

describe('RecruiterOverviewComponent', () => {
  let component: RecruiterOverviewComponent;
  let fixture: ComponentFixture<RecruiterOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
