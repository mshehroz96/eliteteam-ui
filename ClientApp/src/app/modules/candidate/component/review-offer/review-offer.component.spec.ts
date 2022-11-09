import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOfferComponent } from './review-offer.component';

describe('ReviewOfferComponent', () => {
  let component: ReviewOfferComponent;
  let fixture: ComponentFixture<ReviewOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
