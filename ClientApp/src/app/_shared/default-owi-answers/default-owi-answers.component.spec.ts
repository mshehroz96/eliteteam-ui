import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultOWIAnswersComponent } from './default-owi-answers.component';

describe('DefaultOWIAnswersComponent', () => {
  let component: DefaultOWIAnswersComponent;
  let fixture: ComponentFixture<DefaultOWIAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultOWIAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultOWIAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
