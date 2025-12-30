import { Component, computed, inject } from '@angular/core';
import { UserProfileService } from '../../../../service/user/userProfile/user-profile';
import { ProBadge } from "../../../shared/user-ui/pro-badge/pro-badge";
import { ProMeta } from "../../../shared/user-ui/pro-meta/pro-meta";
import { FreeMeta } from "../../../shared/user-ui/free-meta/free-meta";
import { Joined } from "../../../shared/user-ui/joined/joined";

const DEFAULT_AVATAR = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTI1MjViIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg==`;


@Component({
  selector: 'app-profile-header',
  imports: [ProBadge, ProMeta, FreeMeta, Joined],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
userService = inject(UserProfileService);

  // Basis Daten
  avatarUrl = computed(() => this.userService.profile()?.photo || DEFAULT_AVATAR);
  fullName = this.userService.displayName;
  isPremium = this.userService.isPremium;
  joinedDate = computed(() => this.userService.profile()?.date_joined);

  // Username schön formatieren
  username = computed(() => {
    const u = this.userService.profile()?.username;
    return u ? '@' + u : '';
  });

  // --- ECHTE STATS (Live aus den Backend-Daten) ---
  userStats = computed(() => {
    const profile = this.userService.profile();

    // Fallback auf 0, falls Profil noch lädt
    const savedCount = profile?.saved_components?.length || 0;
    const createdCount = profile?.created_components?.length || 0;
    const likeCount = profile?.total_likes || 0;

    return [
      { label: 'Saved', value: savedCount, icon: '💾' },
      { label: 'Created', value: createdCount, icon: '⚡' },
      { label: 'Total Likes', value: likeCount, icon: '❤️' }
    ];
  });

  // --- ACTIONS ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userService.updatePhoto(file).subscribe({
        next: () => { }, // Toast kommt aus dem Service
        error: (err) => console.error('Fehler beim Upload:', err)
      });
    }
  }
}
