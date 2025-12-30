import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { CrawlerSimulator } from "./crawler-simulator/crawler-simulator";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-robots-txt-file',
  imports: [FormsModule, HeadlineGuides, Notice, CrawlerSimulator, CodeBlockGuide],
  templateUrl: './robots-txt-file.html',
  styleUrl: './robots-txt-file.scss',
})
export class RobotsTxtFile {

  robotsTxtCode = `# 1. Rules for ALL bots (Google, Bing, etc.)
User-agent: *

# Allowed: Everything by default
Allow: /

# Disallowed: Sensitive or technical areas
# Keeps your Google index clean from login pages or user profiles.
Disallow: /admin/
Disallow: /profile/
Disallow: /api/

# 2. Sitemap Location (Crucial!)
# Tells the bot where to find all valid links.
Sitemap: https://adenui.com/sitemap.xml`;

}
