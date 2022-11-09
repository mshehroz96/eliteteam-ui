import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockedResumeComponent } from './unlocked-resume.component';

describe('UnlockedResumeComponent', () => {
  let component: UnlockedResumeComponent;
  let fixture: ComponentFixture<UnlockedResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockedResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlockedResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
