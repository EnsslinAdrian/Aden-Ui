import { Component, computed, inject, signal } from '@angular/core';
import { UserProfileService } from '../../../service/user/userProfile/user-profile';
import { ActivatedRoute } from '@angular/router';
import { MemberProfilHeader } from "./member-profil-header/member-profil-header";
import { MemberProfilSidebar } from "./member-profil-sidebar/member-profil-sidebar";
import { MemberProfilLibrary } from "./member-profil-library/member-profil-library";
import { Seo } from '../../../service/seo/meta/seo';
import { JsonLd } from '../../../service/seo/sitelinks/json-ld';

@Component({
  selector: 'app-member-profil',
  imports: [MemberProfilHeader, MemberProfilSidebar, MemberProfilLibrary],
  templateUrl: './member-profil.html',
  styleUrl: './member-profil.scss',
})
export class MemberProfil {
  private route = inject(ActivatedRoute);
  private userService = inject(UserProfileService);
  private seo = inject(Seo);
  private jsonLd = inject(JsonLd);

  member = signal<any>(null);
  memberComponents = signal<any[]>([]);
  loading = signal(true);

  showAll = signal(false);
  initialLimit = 6;

  visibleComponents = computed(() => {
    const all = this.memberComponents();
    if (this.showAll()) {
      return all;
    }
    return all.slice(0, this.initialLimit);
  });

  // --- HIER PASSIERT DIE MAGIE ---
  setSeo(data: any) {
    const fullName = `${data.first_name} ${data.last_name}`;

    // 1. Meta Tags (Titel & Bild)
    this.seo.updateSeo({
      title: fullName,
      description: `Entdecke das Profil von ${fullName} auf Aden UI. ${data.created_components?.length || 0} veröffentlichte UI-Komponenten.`,
      image: data.photo ? data.photo : undefined,
      slug: `profile/${data.username}`
    });

    // 2. Breadcrumbs (Strukturierte Daten für Google)
    this.jsonLd.insertSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://adenui.com"
        },
        // Optional: Eine Zwischenebene "Community", damit es schön aussieht
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Community",
          "item": "https://adenui.com/contribution"
        },
        // Das eigentliche Profil
        {
          "@type": "ListItem",
          "position": 3,
          "name": fullName, // z.B. "Adrian Enßlin"
          "item": `https://adenui.com/profile/${data.username}`
        }
      ]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadMemberData(username);
      }
    });
  }

  private loadMemberData(username: string) {
    this.loading.set(true);

    this.userService.getPublicProfile(username).subscribe({
      next: (data) => {
        this.member.set(data);
        this.memberComponents.set(data.created_components || []);

        this.setSeo(data); // <--- Hier wird alles gesetzt

        this.loading.set(false);
      },
      error: (err) => {
        console.error('Profil Error', err);
        this.loading.set(false);
      }
    });
  }
}

