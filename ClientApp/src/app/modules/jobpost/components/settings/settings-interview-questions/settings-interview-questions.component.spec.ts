import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInterviewQuestionsComponent } from './settings-interview-questions.component';

describe('SettingsInterviewQuestionsComponent', () => {
  let component: SettingsInterviewQuestionsComponent;
  let fixture: ComponentFixture<SettingsInterviewQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsInterviewQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsInterviewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
