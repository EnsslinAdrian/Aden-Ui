import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubscription } from './profile-subscription';

describe('ProfileSubscription', () => {
  let component: ProfileSubscription;
  let fixture: ComponentFixture<ProfileSubscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSubscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSubscription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
