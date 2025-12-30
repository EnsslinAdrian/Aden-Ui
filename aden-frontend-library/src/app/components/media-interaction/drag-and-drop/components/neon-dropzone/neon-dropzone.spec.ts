import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonDropzone } from './neon-dropzone';

describe('NeonDropzone', () => {
  let component: NeonDropzone;
  let fixture: ComponentFixture<NeonDropzone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeonDropzone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeonDropzone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
