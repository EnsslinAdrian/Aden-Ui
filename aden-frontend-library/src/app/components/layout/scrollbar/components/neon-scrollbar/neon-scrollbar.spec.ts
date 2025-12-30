import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonScrollbar } from './neon-scrollbar';

describe('NeonScrollbar', () => {
  let component: NeonScrollbar;
  let fixture: ComponentFixture<NeonScrollbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonScrollbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonScrollbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
