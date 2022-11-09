import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayInterviewQuestionsComponent } from './one-way-interview-questions.component';

describe('OneWayInterviewQuestionsComponent', () => {
  let component: OneWayInterviewQuestionsComponent;
  let fixture: ComponentFixture<OneWayInterviewQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayInterviewQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneWayInterviewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
