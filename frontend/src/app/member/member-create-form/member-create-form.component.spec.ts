import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCreateFormComponent } from './member-create-form.component';

describe('MemberCreateFormComponent', () => {
  let component: MemberCreateFormComponent;
  let fixture: ComponentFixture<MemberCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
