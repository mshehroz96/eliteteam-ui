import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnewayInterviewCompletedComponent } from './oneway-interview-completed.component';

describe('OnewayInterviewCompletedComponent', () => {
  let component: OnewayInterviewCompletedComponent;
  let fixture: ComponentFixture<OnewayInterviewCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnewayInterviewCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnewayInterviewCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
