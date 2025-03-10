import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listitem2Component } from './listitem2.component';

describe('Listitem2Component', () => {
  let component: Listitem2Component;
  let fixture: ComponentFixture<Listitem2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Listitem2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listitem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
