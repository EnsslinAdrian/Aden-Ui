import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonSnackbar } from './neon-snackbar';

describe('NeonSnackbar', () => {
  let component: NeonSnackbar;
  let fixture: ComponentFixture<NeonSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
