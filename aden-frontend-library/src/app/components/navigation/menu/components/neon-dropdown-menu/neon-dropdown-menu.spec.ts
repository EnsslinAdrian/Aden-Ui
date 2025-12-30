import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonDropdownMenu } from './neon-dropdown-menu';

describe('NeonDropdownMenu', () => {
  let component: NeonDropdownMenu;
  let fixture: ComponentFixture<NeonDropdownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonDropdownMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonDropdownMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
