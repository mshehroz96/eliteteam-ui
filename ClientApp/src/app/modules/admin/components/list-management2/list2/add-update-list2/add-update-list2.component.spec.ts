import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateList2Component } from './add-update-list2.component';

describe('AddUpdateList2Component', () => {
  let component: AddUpdateList2Component;
  let fixture: ComponentFixture<AddUpdateList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateList2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
