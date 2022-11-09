import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalShowcaseComponent } from './external-showcase.component';

describe('ExternalShowcaseComponent', () => {
  let component: ExternalShowcaseComponent;
  let fixture: ComponentFixture<ExternalShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
