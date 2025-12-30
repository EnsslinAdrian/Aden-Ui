import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLogout } from './profile-logout';

describe('ProfileLogout', () => {
  let component: ProfileLogout;
  let fixture: ComponentFixture<ProfileLogout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLogout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLogout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
