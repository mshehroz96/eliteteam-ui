import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesDBComponent } from './candidatesdb.component';


describe('CandidatesDBComponent', () => {
  let component: CandidatesDBComponent;
  let fixture: ComponentFixture<CandidatesDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesDBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
