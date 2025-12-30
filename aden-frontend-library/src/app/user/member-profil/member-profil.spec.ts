import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfil } from './member-profil';

describe('MemberProfil', () => {
  let component: MemberProfil;
  let fixture: ComponentFixture<MemberProfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberProfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
