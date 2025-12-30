import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDelete } from './profile-delete';

describe('ProfileDelete', () => {
  let component: ProfileDelete;
  let fixture: ComponentFixture<ProfileDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
