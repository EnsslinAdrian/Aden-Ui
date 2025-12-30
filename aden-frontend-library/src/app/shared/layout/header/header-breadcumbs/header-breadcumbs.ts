import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Layout } from '../../../../../service/global/layout/layout';

@Component({
  selector: 'app-header-breadcumbs',
  imports: [RouterLink],
  templateUrl: './header-breadcumbs.html',
  styleUrl: './header-breadcumbs.scss',
})
export class HeaderBreadcumbs {
  breadcrumbs: string[] = [];

  public layoutService = inject(Layout);

  constructor(private router: Router) {
    this.updateBreadcrumbs();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  updateBreadcrumbs() {
    const url = this.router.url.split('?')[0];
    const parts = url.split('/').filter(x => x);

    this.breadcrumbs = parts.map(p =>
      p.charAt(0).toUpperCase() + p.slice(1)
    );
  }
}
