import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionRecruitersViewComponent } from './requisition-recruiters-view.component';

describe('RequisitionRecruitersViewComponent', () => {
  let component: RequisitionRecruitersViewComponent;
  let fixture: ComponentFixture<RequisitionRecruitersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionRecruitersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionRecruitersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
