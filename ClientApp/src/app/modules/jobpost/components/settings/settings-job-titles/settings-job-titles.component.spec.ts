import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsJobTitlesComponent } from './settings-job-titles.component';

describe('SettingsJobTitlesComponent', () => {
  let component: SettingsJobTitlesComponent;
  let fixture: ComponentFixture<SettingsJobTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsJobTitlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsJobTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
