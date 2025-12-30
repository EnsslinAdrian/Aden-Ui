import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlsService } from '../../global/urls/urls.service';

@Injectable({ providedIn: 'root' })
export class ComponentCodeService {
  protected url = inject(UrlsService);

  constructor(private http: HttpClient) {}

  load(category: string, component: string, version: string, file: string) {
    const url = `${this.url.componentsCodeUrl}${category}/${component}/${version}/${file}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
