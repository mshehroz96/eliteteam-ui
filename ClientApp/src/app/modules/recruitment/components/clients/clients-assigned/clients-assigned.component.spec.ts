import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAssignedComponent } from './clients-assigned.component';

describe('ClientsAssignedComponent', () => {
  let component: ClientsAssignedComponent;
  let fixture: ComponentFixture<ClientsAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
