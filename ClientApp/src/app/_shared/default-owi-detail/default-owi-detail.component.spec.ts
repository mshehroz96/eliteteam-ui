import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultOWIDetailComponent } from './default-owi-detail.component';

describe('DefaultOWIDetailComponent', () => {
  let component: DefaultOWIDetailComponent;
  let fixture: ComponentFixture<DefaultOWIDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultOWIDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultOWIDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
