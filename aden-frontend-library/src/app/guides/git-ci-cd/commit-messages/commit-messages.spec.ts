import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitMessages } from './commit-messages';

describe('CommitMessages', () => {
  let component: CommitMessages;
  let fixture: ComponentFixture<CommitMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitMessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
