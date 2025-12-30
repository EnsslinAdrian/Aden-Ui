import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilHeader } from './member-profil-header';

describe('MemberProfilHeader', () => {
  let component: MemberProfilHeader;
  let fixture: ComponentFixture<MemberProfilHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberProfilHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProfilHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
