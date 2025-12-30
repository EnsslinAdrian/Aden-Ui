import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentAuthor, ComponentMeta, ComponentStats } from '../../../interface/component-meta';
import { UrlsService } from '../../global/urls/urls.service';

export interface InteractionStatus {
  liked: boolean;
  saved: boolean;
  likes_count: number;
  author?: ComponentAuthor;
}

export interface MyLibraryResponse {
  created: any[]; // oder strenger typisiert, wenn du ein ComponentInterface hast
  saved: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ComponentInteraction {
  private http = inject(HttpClient);
  protected url = inject(UrlsService);

  // 1. Hole die echten Stats (Author, Likes) anhand des Slugs
  getStats(slug: string): Observable<ComponentStats> {
    return this.http.get<ComponentStats>(`${this.url.componentsMetaUrl}${slug}/`);
  }

  // 2. Liken
  toggleLike(slug: string): Observable<{ status: string, likes_count: number }> {
    return this.http.post<{ status: string, likes_count: number }>(`${this.url.componentsMetaUrl}${slug}/like/`, {});
  }

  getMyLibrary(): Observable<MyLibraryResponse> {
    // Ruft den neuen Endpoint auf
    return this.http.get<MyLibraryResponse>(`${this.url.componentsMetaUrl}my-library/`);
  }

    toggleSave(slug: string): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.url.componentsMetaUrl}${slug}/save/`, {});
  }
}
