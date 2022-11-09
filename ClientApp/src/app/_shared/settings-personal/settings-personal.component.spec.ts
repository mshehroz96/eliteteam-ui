import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPersonalComponent } from './settings-personal.component';

describe('SettingsPersonalComponent', () => {
  let component: SettingsPersonalComponent;
  let fixture: ComponentFixture<SettingsPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
