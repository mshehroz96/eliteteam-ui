import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesListingComponent } from './candidates-listing.component';

describe('CandidatesListingComponent', () => {
  let component: CandidatesListingComponent;
  let fixture: ComponentFixture<CandidatesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
