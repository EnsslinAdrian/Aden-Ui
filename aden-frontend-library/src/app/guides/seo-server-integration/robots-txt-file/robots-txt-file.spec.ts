import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotsTxtFile } from './robots-txt-file';

describe('RobotsTxtFile', () => {
  let component: RobotsTxtFile;
  let fixture: ComponentFixture<RobotsTxtFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotsTxtFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotsTxtFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
