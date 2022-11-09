import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsJobTitleDetailsComponent } from './settings-job-title-details.component';

describe('SettingsJobTitleDetailsComponent', () => {
  let component: SettingsJobTitleDetailsComponent;
  let fixture: ComponentFixture<SettingsJobTitleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsJobTitleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsJobTitleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
