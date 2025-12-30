import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonBlurDialog } from './neon-blur-dialog';

describe('NeonBlurDialog', () => {
  let component: NeonBlurDialog;
  let fixture: ComponentFixture<NeonBlurDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonBlurDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonBlurDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
