import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningCategoryDetailsComponent } from './screening-category-details.component';

describe('ScreeningCategoryDetailsComponent', () => {
  let component: ScreeningCategoryDetailsComponent;
  let fixture: ComponentFixture<ScreeningCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningCategoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
