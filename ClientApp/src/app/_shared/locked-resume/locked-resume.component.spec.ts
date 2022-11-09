import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedResumeComponent } from './locked-resume.component';

describe('LockedResumeComponent', () => {
  let component: LockedResumeComponent;
  let fixture: ComponentFixture<LockedResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockedResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
