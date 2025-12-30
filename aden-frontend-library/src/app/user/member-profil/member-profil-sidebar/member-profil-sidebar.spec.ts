import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilSidebar } from './member-profil-sidebar';

describe('MemberProfilSidebar', () => {
  let component: MemberProfilSidebar;
  let fixture: ComponentFixture<MemberProfilSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberProfilSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProfilSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
