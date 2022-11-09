/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddUpdateCommunicationTemplatesComponent } from './add-update-communication-templates.component';

describe('AddUpdateCommunicationTemplatesComponent', () => {
  let component: AddUpdateCommunicationTemplatesComponent;
  let fixture: ComponentFixture<AddUpdateCommunicationTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCommunicationTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCommunicationTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
