import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientmeetingViewComponent } from './clientmeeting-view.component';

describe('ClientmeetingViewComponent', () => {
  let component: ClientmeetingViewComponent;
  let fixture: ComponentFixture<ClientmeetingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientmeetingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientmeetingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
