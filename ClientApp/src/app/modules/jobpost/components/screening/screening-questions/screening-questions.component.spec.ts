import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningQuestionsComponent } from './screening-questions.component';

describe('ScreeningQuestionsComponent', () => {
  let component: ScreeningQuestionsComponent;
  let fixture: ComponentFixture<ScreeningQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreeningQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
