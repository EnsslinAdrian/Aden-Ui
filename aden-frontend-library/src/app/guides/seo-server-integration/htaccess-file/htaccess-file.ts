import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Badge } from "../../../components/feedback-indicators/badge/badge";
import { GuideBadge } from "../../../shared/ui/guide-badge/guide-badge";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { InteractiveServer } from "./interactive-server/interactive-server";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-htaccess-file',
  imports: [FormsModule, HeadlineGuides, Notice, InteractiveServer, CodeBlockGuide],
  templateUrl: './htaccess-file.html',
  styleUrl: './htaccess-file.scss',
})
export class HtaccessFile {

  htaccessCode = `<IfModule mod_rewrite.c>
  RewriteEngine On

  # 1. Real file exists? (Images, CSS, JS)
  # If yes (-f = file, -d = directory): Serve directly.
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
  RewriteRule ^ - [L]

  # 2. Virtual route?
  # Redirect everything else to index.html. Angular handles the rest.
  RewriteRule ^ /index.html [L]
</IfModule>`;

}
