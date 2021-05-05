import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowablesListComponent } from './borrowables-list.component';

describe('BorrowablesListComponent', () => {
  let component: BorrowablesListComponent;
  let fixture: ComponentFixture<BorrowablesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowablesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
