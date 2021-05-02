import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowableUpdateFormComponent } from './borrowable-update-form.component';

describe('BorrowableUpdateFormComponent', () => {
  let component: BorrowableUpdateFormComponent;
  let fixture: ComponentFixture<BorrowableUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowableUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowableUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
