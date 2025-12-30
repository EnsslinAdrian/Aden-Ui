import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadBannerSection } from './download-banner-section';

describe('DownloadBannerSection', () => {
  let component: DownloadBannerSection;
  let fixture: ComponentFixture<DownloadBannerSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadBannerSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadBannerSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
