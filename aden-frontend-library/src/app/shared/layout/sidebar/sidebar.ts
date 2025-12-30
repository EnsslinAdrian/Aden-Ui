import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HighlightPipe } from '../../../../pipe/highlight/highlight-pipe';
import { LibraryCategory, LibraryComponent } from '../../../../interface/category';
import { Typografie } from "../../text/typografie/typografie";
import { Layout } from '../../../../service/global/layout/layout';
import { SidebarFooter } from "./sidebar-footer/sidebar-footer";
import { SidebarSearch } from "./sidebar-search/sidebar-search";
import { Auth } from '../../../../service/auth/auth';
import { UserProfileService } from '../../../../service/user/userProfile/user-profile';
import { Library } from '../../../../service/components/library/library';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, FormsModule, HighlightPipe, Typografie, SidebarFooter, SidebarSearch],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class.closed]': '!layout.sidebarOpen()'
  }
})
export class Sidebar {
 search = '';
  focusedIndex = -1;

  public layout = inject(Layout);
  public auth = inject(Auth);
  public userProfile = inject(UserProfileService);

  private platformId = inject(PLATFORM_ID);
  private lastWidth = 0;

  constructor(private library: Library, private router: Router) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.lastWidth = window.innerWidth;

    if (window.innerWidth <= 760) {
      this.layout.sidebarOpen.set(false);
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (!isPlatformBrowser(this.platformId)) return;

    const currentWidth = window.innerWidth;
    const breakpoint = 900;

    if (this.lastWidth > breakpoint && currentWidth <= breakpoint) {
      this.layout.sidebarOpen.set(false);
    } else if (this.lastWidth <= breakpoint && currentWidth > breakpoint) {
      this.layout.sidebarOpen.set(true);
    }

    this.lastWidth = currentWidth;
  }

  handleLinkClick() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (window.innerWidth <= 900) {
      this.layout.sidebarOpen.set(false);
    }
  }

  get filteredCategories(): LibraryCategory[] {
    return this.library.filterCategories(this.search);
  }

  get flatListComponent(): LibraryComponent[] {
    return this.filteredCategories.flatMap(cat => cat.components);
  }

  onSearchChange() {
    this.focusedIndex = -1;
  }

  onKeydown(event: KeyboardEvent) {
    if (!this.layout.sidebarOpen()) return;
    if (!isPlatformBrowser(this.platformId)) return;

    const list = this.flatListComponent;
    if (list.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % list.length;
        this.scrollToActive();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex - 1 + list.length) % list.length;
        this.scrollToActive();
        break;

      case 'Enter':
        event.preventDefault();
        if (this.focusedIndex >= 0 && list[this.focusedIndex]) {
          const component = list[this.focusedIndex];
          this.router.navigate([component.route]);
          this.handleLinkClick();
        }
        break;

      case 'Escape':
        this.search = '';
        this.focusedIndex = -1;
        break;
    }
  }

  scrollToActive() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const activeEl = document.querySelector('.component-link.keyboard-active');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 0);
  }

  isFocused(component: LibraryComponent): boolean {
    const list = this.flatListComponent;
    return list[this.focusedIndex] === component;
  }

  isActive(component: LibraryComponent): boolean {
    if (!component.route) return false;
    return this.router.isActive(component.route, {
      paths: 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
