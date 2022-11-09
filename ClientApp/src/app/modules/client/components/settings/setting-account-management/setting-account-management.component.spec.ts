import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAccountManagementComponent } from './setting-account-management.component';

describe('SettingAccountManagementComponent', () => {
  let component: SettingAccountManagementComponent;
  let fixture: ComponentFixture<SettingAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAccountManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
