
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatePageviewComponent } from './candidate-pageview.component';

describe('CandidatePageviewComponent', () => {
  let component: CandidatePageviewComponent;
  let fixture: ComponentFixture<CandidatePageviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatePageviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatePageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
