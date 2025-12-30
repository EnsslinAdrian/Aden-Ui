import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtaccessFile } from './htaccess-file';

describe('HtaccessFile', () => {
  let component: HtaccessFile;
  let fixture: ComponentFixture<HtaccessFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtaccessFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtaccessFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
