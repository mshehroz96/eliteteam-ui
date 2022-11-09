import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonclientComponent } from './commonclient.component';

describe('CommonclientComponent', () => {
  let component: CommonclientComponent;
  let fixture: ComponentFixture<CommonclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
