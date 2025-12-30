import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilLibrary } from './member-profil-library';

describe('MemberProfilLibrary', () => {
  let component: MemberProfilLibrary;
  let fixture: ComponentFixture<MemberProfilLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberProfilLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProfilLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
