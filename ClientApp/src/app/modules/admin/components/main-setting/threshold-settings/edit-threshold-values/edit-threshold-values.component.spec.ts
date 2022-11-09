/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditThresholdValuesComponent } from './edit-threshold-values.component';

describe('EditThresholdValuesComponent', () => {
  let component: EditThresholdValuesComponent;
  let fixture: ComponentFixture<EditThresholdValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThresholdValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThresholdValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
