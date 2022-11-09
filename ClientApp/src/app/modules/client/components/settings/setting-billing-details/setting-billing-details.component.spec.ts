import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBillingDetailsComponent } from './setting-billing-details.component';

describe('SettingBillingDetailsComponent', () => {
  let component: SettingBillingDetailsComponent;
  let fixture: ComponentFixture<SettingBillingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBillingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBillingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
