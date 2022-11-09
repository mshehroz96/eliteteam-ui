import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayInterviewTemplatesComponent } from './one-way-interview-templates.component';

describe('OneWayInterviewTemplatesComponent', () => {
  let component: OneWayInterviewTemplatesComponent;
  let fixture: ComponentFixture<OneWayInterviewTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayInterviewTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneWayInterviewTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
