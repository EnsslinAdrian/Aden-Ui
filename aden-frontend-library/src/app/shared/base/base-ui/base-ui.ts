import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ComponentCodeService } from '../../../../service/components/component-code/component-code';
import { ComponentInteraction } from '../../../../service/components/component-interaction/component-interaction';
import { ComponentMeta } from '../../../../interface/component-meta';

export type FileType = 'html' | 'scss' | 'ts' | 'md';

@Component({
  selector: 'app-base-ui',
  imports: [],
  templateUrl: './base-ui.html',
  styleUrl: './base-ui.scss',
})
export abstract class BaseUi {
  protected codeLoader = inject(ComponentCodeService);
  protected cdr = inject(ChangeDetectorRef); // HIER INJECTEN

  codeHtml = '';
  codeScss = '';
  codeTs = '';
  installCode = '';

  abstract meta: ComponentMeta;
  abstract get FILE_CATEGORY(): string;
  abstract get FILE_COMPONENT(): string;
  abstract get FILE_VERSION(): string;

  get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts', 'md'];
  }

  ngOnInit(): void {
    this.loadCodeFiles();
  }

  protected loadCodeFiles() {
    const files = this.filesToLoad;
    if (files.includes('html')) this.loadFile('html.html', c => this.codeHtml = c);
    if (files.includes('scss')) this.loadFile('scss.scss', c => this.codeScss = c);
    if (files.includes('ts'))   this.loadFile('ts.ts', c => this.codeTs = c);
    if (files.includes('md'))   this.loadFile('md.md', c => this.installCode = c);
  }

  private loadFile(ext: string, setter: (code: string) => void) {
    this.codeLoader.load(this.FILE_CATEGORY, this.FILE_COMPONENT, this.FILE_VERSION, ext)
      .subscribe({
        next: (code) => {
            setter(code);
            // WICHTIG: Manuelles Update erzwingen, um den Error zu verhindern
            this.cdr.detectChanges();
        },
        error: () => { }
      });
  }
}
