import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatenessDescriptorComponent } from './lateness-descriptor.component';

describe('LatenessDescriptorComponent', () => {
  let component: LatenessDescriptorComponent;
  let fixture: ComponentFixture<LatenessDescriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatenessDescriptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatenessDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
