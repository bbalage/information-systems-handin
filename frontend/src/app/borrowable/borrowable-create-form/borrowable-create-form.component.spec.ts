import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowableCreateFormComponent } from './borrowable-create-form.component';

describe('BorrowableCreateFormComponent', () => {
  let component: BorrowableCreateFormComponent;
  let fixture: ComponentFixture<BorrowableCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowableCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowableCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
