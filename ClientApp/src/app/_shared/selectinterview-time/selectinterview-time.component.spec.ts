import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectinterviewTimeComponent } from './selectinterview-time.component';

describe('SelectinterviewTimeComponent', () => {
  let component: SelectinterviewTimeComponent;
  let fixture: ComponentFixture<SelectinterviewTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectinterviewTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectinterviewTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
