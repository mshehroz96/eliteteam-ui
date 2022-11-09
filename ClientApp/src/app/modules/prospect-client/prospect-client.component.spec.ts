import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectClientComponent } from './prospect-client.component';

describe('ProspectClientComponent', () => {
  let component: ProspectClientComponent;
  let fixture: ComponentFixture<ProspectClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
