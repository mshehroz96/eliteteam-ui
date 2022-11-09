import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecializationComponent } from './user-specialization.component';

describe('UserSpecializationComponent', () => {
  let component: UserSpecializationComponent;
  let fixture: ComponentFixture<UserSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSpecializationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
