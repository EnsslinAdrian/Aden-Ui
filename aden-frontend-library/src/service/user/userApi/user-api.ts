import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../interface/user';
import { UrlsService } from '../../global/urls/urls.service';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private http = inject(HttpClient);
  private urls = inject(UrlsService);

  getMyProfile(): Observable<UserProfile> {
    // Liefert jetzt User + created_components + saved_components
    return this.http.get<UserProfile>(this.urls.userProfileUrl);
  }

  updateProfile(data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>(this.urls.userProfileUrl, data);
  }

  uploadPhoto(file: File): Observable<UserProfile> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.patch<UserProfile>(this.urls.userProfileUrl, formData);
  }

  deletePhoto(): Observable<UserProfile> {
    return this.http.delete<UserProfile>(`${this.urls.userProfileUrl}photo/`);
  }

  getPublicProfile(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.urls.membersUrl}${username}/`);
  }
}

