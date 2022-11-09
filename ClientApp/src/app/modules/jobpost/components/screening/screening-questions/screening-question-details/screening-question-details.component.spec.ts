import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningQuestionDetailsComponent } from './screening-question-details.component';

describe('ScreeningQuestionDetailsComponent', () => {
  let component: ScreeningQuestionDetailsComponent;
  let fixture: ComponentFixture<ScreeningQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningQuestionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
