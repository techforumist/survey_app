import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteStatusComponent } from './vote-status.component';

describe('VoteStatusComponent', () => {
  let component: VoteStatusComponent;
  let fixture: ComponentFixture<VoteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
