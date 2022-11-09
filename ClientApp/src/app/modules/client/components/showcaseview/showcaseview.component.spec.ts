import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseviewComponent } from './showcaseview.component';

describe('ShowcaseviewComponent', () => {
  let component: ShowcaseviewComponent;
  let fixture: ComponentFixture<ShowcaseviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
