import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesHome } from './guides-home';

describe('GuidesHome', () => {
  let component: GuidesHome;
  let fixture: ComponentFixture<GuidesHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidesHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidesHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
