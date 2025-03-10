import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateListitem2Component } from './add-update-listitem2.component';

describe('AddUpdateListitem2Component', () => {
  let component: AddUpdateListitem2Component;
  let fixture: ComponentFixture<AddUpdateListitem2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateListitem2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateListitem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
