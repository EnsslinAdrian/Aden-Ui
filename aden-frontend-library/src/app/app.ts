import { Component, ElementRef, HostListener, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Sidebar } from "./shared/layout/sidebar/sidebar";
import { Header } from "./shared/layout/header/header";
import { Footer } from "./shared/layout/footer/footer";
import { ReAuthenticate } from "./dialogs/re-authenticate/re-authenticate";
import { AppToastsContainer } from "./shared/feedbacks/toast-message/toast-container";
import { isPlatformBrowser } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs';
import { Seo } from '../service/seo/meta/seo';
import { JsonLd } from '../service/seo/sitelinks/json-ld';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, Footer, ReAuthenticate, AppToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(Seo);
  private jsonLdService = inject(JsonLd);

  protected readonly title = signal('aden_frontend_library');

  protected spotlightStyle = signal(
    'radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.05), transparent 40%)'
  );

  @ViewChild('contentContainer') content?: ElementRef<HTMLElement>;

  showReAuth = signal(false);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        // Wir suchen die tiefste aktive Route (Child-Routes)
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data) // Wir holen die 'data' Property
    ).subscribe(data => {

      if (data['title']) {
        this.seoService.updateSeo({
          title: data['title'],
          description: data['description'],
          image: data['image'],
          robots: data['robots']
        });
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  private scrollToTop() {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.content?.nativeElement;
    if (el && typeof el.scrollTo === 'function') {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;

    const x = e.clientX;
    const y = e.clientY;

    this.spotlightStyle.set(
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 40%)`
    );
  }

  onAuthenticated() {
    this.showReAuth.set(false);
  }

  onLogout() {
    this.showReAuth.set(false);
  }
}
