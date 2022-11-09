import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayInterviewComponent } from './one-way-interview.component';

describe('OneWayInterviewComponent', () => {
  let component: OneWayInterviewComponent;
  let fixture: ComponentFixture<OneWayInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneWayInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
