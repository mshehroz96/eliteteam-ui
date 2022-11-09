/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShareJobComponent } from './share-job.component';

describe('ShareJobComponent', () => {
  let component: ShareJobComponent;
  let fixture: ComponentFixture<ShareJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
