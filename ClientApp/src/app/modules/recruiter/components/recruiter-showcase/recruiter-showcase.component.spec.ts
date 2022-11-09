import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterShowcaseComponent } from './recruiter-showcase.component';

describe('RecruiterShowcaseComponent', () => {
  let component: RecruiterShowcaseComponent;
  let fixture: ComponentFixture<RecruiterShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
