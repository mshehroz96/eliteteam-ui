import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsUnassignedComponent } from './clients-unassigned.component';

describe('ClientsUnassignedComponent', () => {
  let component: ClientsUnassignedComponent;
  let fixture: ComponentFixture<ClientsUnassignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsUnassignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsUnassignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
