import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowableSearchComponent } from './borrowable-search.component';

describe('BorrowableSearchComponent', () => {
  let component: BorrowableSearchComponent;
  let fixture: ComponentFixture<BorrowableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowableSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
