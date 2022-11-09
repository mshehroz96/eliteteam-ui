import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningCategoriesComponent } from './screening-categories.component';

describe('ScreeningCategoriesComponent', () => {
  let component: ScreeningCategoriesComponent;
  let fixture: ComponentFixture<ScreeningCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
