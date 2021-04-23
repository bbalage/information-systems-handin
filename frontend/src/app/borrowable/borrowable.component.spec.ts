import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowableComponent } from './borrowable.component';

describe('BorrowableComponent', () => {
  let component: BorrowableComponent;
  let fixture: ComponentFixture<BorrowableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
