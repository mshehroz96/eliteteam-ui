import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSettingsPersonal2Component } from './shared-settings-personal2.component';

describe('SharedSettingsPersonal2Component', () => {
  let component: SharedSettingsPersonal2Component;
  let fixture: ComponentFixture<SharedSettingsPersonal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSettingsPersonal2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedSettingsPersonal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
