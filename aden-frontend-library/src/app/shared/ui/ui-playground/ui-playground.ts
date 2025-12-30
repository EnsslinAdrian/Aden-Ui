import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, signal } from '@angular/core';
import { ComponentAuthor, ComponentMeta } from '../../../../interface/component-meta';
import { Router } from '@angular/router';
import { UserProfileService } from '../../../../service/user/userProfile/user-profile';
import { ComponentInteraction } from '../../../../service/components/component-interaction/component-interaction';
import { UiPlaygroundHeader } from "./ui-playground-header/ui-playground-header";
import { UiPlaygroundCode } from "./ui-playground-code/ui-playground-code";

type Tab = 'preview' | 'code' | 'install';
type CodeLang = 'html' | 'scss' | 'ts';

@Component({
  selector: 'app-ui-playground',
  imports: [CommonModule, UiPlaygroundHeader, UiPlaygroundCode],
  templateUrl: './ui-playground.html',
  styleUrl: './ui-playground.scss',
})
export class UiPlayground {
  private router = inject(Router);
  protected userProfile = inject(UserProfileService);
  private interactionService = inject(ComponentInteraction);

  // --- INPUTS (Code Strings) ---
  htmlCode = input<string>('');
  scssCode = input<string>('');
  tsCode = input<string>('');
  installCode = input<string>('');

  @Input() meta: ComponentMeta | undefined;

  // --- STATE ---
  activeTab = signal<Tab>('preview');
  activeCodeLang = signal<CodeLang>('html');
  copied = signal(false); 

  // Dynamic Data
  likeCount = signal(0);
  isLiked = signal(false);
  isSaved = signal(false);

  displayAuthor = signal<ComponentAuthor | undefined>(undefined);
  isComponentPremium = signal(false);

  ngOnInit() {
    if (this.meta && this.meta.slug) {
      // 1. Statische Daten als Fallback setzen
      if (this.meta.author) {
        const safeAuthor: ComponentAuthor = {
          id: this.meta.author.id ?? 0,
          first_name: this.meta.author.first_name ?? '',
          last_name: this.meta.author.last_name ?? '',
          username: this.meta.author.username ?? 'unknown',
          photo: this.meta.author.photo
        };
        this.displayAuthor.set(safeAuthor);
      }

      // 2. Dynamische Daten laden (API)
      this.loadDynamicData(this.meta.slug);
    }
  }

  private loadDynamicData(slug: string) {
    this.interactionService.getStats(slug).subscribe({
      next: (stats: any) => {
        this.likeCount.set(stats.likes_count);

        if (stats.is_liked_by_user !== undefined) this.isLiked.set(stats.is_liked_by_user);
        if (stats.is_saved_by_user !== undefined) this.isSaved.set(stats.is_saved_by_user);
        if (stats.author) this.displayAuthor.set(stats.author);
        if (stats.is_premium !== undefined) this.isComponentPremium.set(stats.is_premium);
      },
      error: (err) => console.error('Fehler beim Laden der Stats', err)
    });
  }

  toggleLike() {
    if (!this.meta || !this.meta.slug) return;

    const currentLikes = this.likeCount();
    const currentlyLiked = this.isLiked();

    // Optimistic Update
    this.isLiked.set(!currentlyLiked);
    this.likeCount.set(currentlyLiked ? currentLikes - 1 : currentLikes + 1);

    this.interactionService.toggleLike(this.meta.slug).subscribe({
      next: (res) => {
        this.likeCount.set(res.likes_count);
        // Optional: Wenn es eigene Component ist, Profil neu laden (für Total Likes)
        if (this.isComponentPremium()) {
          this.userProfile.loadProfile().subscribe();
        }
      },
      error: () => {
        // Rollback bei Fehler
        this.isLiked.set(currentlyLiked);
        this.likeCount.set(currentLikes);
      }
    });
  }

  toggleSave() {
    if (!this.meta || !this.meta.slug) return;

    const user = this.userProfile.profile();
    if (!user) {
      this.redirectToLogin();
      return;
    }

    const currentSaved = this.isSaved();
    // Optimistic Update
    this.isSaved.set(!currentSaved);

    this.interactionService.toggleSave(this.meta.slug).subscribe({
      next: (res) => {
        // Profil neu laden, damit es in der "Saved" Liste erscheint
        this.userProfile.loadProfile().subscribe();
      },
      error: (err) => {
        console.error('Fehler beim Speichern', err);
        // Rollback
        this.isSaved.set(currentSaved);
      }
    });
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
    if (tab === 'code') this.activeCodeLang.set('html');
  }

  setCodeLang(lang: CodeLang) {
    this.activeCodeLang.set(lang);
  }

  canViewCode(): boolean {
    if (!this.isComponentPremium()) return true;

    const user = this.userProfile.profile();
    return !!user?.is_premium;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  copyCode() {
    if (!this.canViewCode()) return;

    let textToCopy = '';

    if (this.activeTab() === 'install') {
      textToCopy = this.installCode();
    } else {
      switch (this.activeCodeLang()) {
        case 'html': textToCopy = this.htmlCode(); break;
        case 'scss': textToCopy = this.scssCode(); break;
        case 'ts': textToCopy = this.tsCode(); break;
      }
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
