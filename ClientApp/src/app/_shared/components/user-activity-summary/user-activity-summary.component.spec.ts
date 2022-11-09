import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivitySummaryComponent } from './user-activity-summary.component';

describe('UserActivitySummaryComponent', () => {
  let component: UserActivitySummaryComponent;
  let fixture: ComponentFixture<UserActivitySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivitySummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivitySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
