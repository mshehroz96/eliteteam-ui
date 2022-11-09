import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDataManagementComponent } from './setting-data-management.component';

describe('SettingDataManagementComponent', () => {
  let component: SettingDataManagementComponent;
  let fixture: ComponentFixture<SettingDataManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingDataManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingDataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
