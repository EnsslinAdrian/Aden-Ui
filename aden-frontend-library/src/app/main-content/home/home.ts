import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeroSection } from "./hero-section/hero-section";
import { FeaturesSection } from "./features-section/features-section";
import { QuickStartSection } from "./quick-start-section/quick-start-section";
import { DownloadBannerSection } from "./download-banner-section/download-banner-section";
import { JsonLd } from '../../../service/seo/sitelinks/json-ld';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroSection, FeaturesSection, QuickStartSection, DownloadBannerSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private jsonLd = inject(JsonLd);

  ngOnInit() {
    this.jsonLd.setWebsiteSchema();
  }
}
