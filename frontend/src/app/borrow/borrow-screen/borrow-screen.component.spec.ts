import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowScreenComponent } from './borrow-screen.component';

describe('BorrowScreenComponent', () => {
  let component: BorrowScreenComponent;
  let fixture: ComponentFixture<BorrowScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
