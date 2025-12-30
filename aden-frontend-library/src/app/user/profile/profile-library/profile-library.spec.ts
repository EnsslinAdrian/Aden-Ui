import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLibrary } from './profile-library';

describe('ProfileLibrary', () => {
  let component: ProfileLibrary;
  let fixture: ComponentFixture<ProfileLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
