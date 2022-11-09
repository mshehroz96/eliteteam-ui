import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterShowcaseViewComponent } from './recruiter-showcase-view.component';

describe('RecruiterShowcaseViewComponent', () => {
  let component: RecruiterShowcaseViewComponent;
  let fixture: ComponentFixture<RecruiterShowcaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterShowcaseViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterShowcaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
