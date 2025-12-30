import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileService } from '../../../service/user/userProfile/user-profile';
import { ProfileHeader } from "./profile-header/profile-header";
import { ProfileSettings } from "./profile-settings/profile-settings";
import { ProfileSubscription } from "./profile-subscription/profile-subscription";
import { ProfileDelete } from "./profile-delete/profile-delete";
import { ProfileLogout } from "./profile-logout/profile-logout";
import { ProfileLibrary } from "./profile-library/profile-library";
import { DeleteAccount } from "../../dialogs/delete-account/delete-account";
import { UpgradeDialog } from "../../dialogs/upgrade-dialog/upgrade-dialog";
import { UnsavedChanges } from '../../dialogs/unsaved-changes/unsaved-changes';
import { Observable, Subject } from 'rxjs';

const DEFAULT_AVATAR = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTI1MjViIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg==`;


@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, ProfileHeader, ProfileSettings, ProfileSubscription, ProfileDelete, ProfileLogout, ProfileLibrary, DeleteAccount, UpgradeDialog, UnsavedChanges],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  @ViewChild(ProfileSettings) settingsComponent!: ProfileSettings;

  userService = inject(UserProfileService);
  showDeleteDialog = signal(false);
  showUpgradeDialog = signal(false);

  showUnsavedDialog = signal(false);
  private deactivationSubject: Subject<boolean> | null = null;

  canDeactivate(): boolean | Observable<boolean> {
    // 1. Prüfen: Gibt es Änderungen im Kind (Settings)?
    // Wir rufen eine neue Methode 'hasUnsavedChanges()' im Kind auf
    const hasChanges = this.settingsComponent ? this.settingsComponent.hasUnsavedChanges() : false;

    if (!hasChanges) {
      return true; // Keine Änderungen -> Sofort gehen
    }

    // 2. Änderungen da -> Dialog öffnen und warten
    this.showUnsavedDialog.set(true);

    // Wir erstellen ein "Warte-Objekt" (Subject)
    this.deactivationSubject = new Subject<boolean>();
    return this.deactivationSubject.asObservable();
  }

  // Wird aufgerufen, wenn User im Dialog klickt
  handleUnsavedDecision(leave: boolean) {
    this.showUnsavedDialog.set(false); // Dialog zu

    if (this.deactivationSubject) {
      this.deactivationSubject.next(leave); // Ergebnis an Router senden (true = weg, false = bleiben)
      this.deactivationSubject.complete();
      this.deactivationSubject = null;
    }
  }


  constructor() {
    this.userService.loadProfile().subscribe({
      error: (err) => console.error('Fehler beim Laden:', err)
    });
  }

  avatarUrl = computed(() => {
    return this.userService.profile()?.photo || DEFAULT_AVATAR;
  });

  fullName = this.userService.displayName;

  // NEU: Echten Username nutzen (nicht mehr aus Email splitten)
  username = computed(() => {
    const u = this.userService.profile()?.username;
    return u ? '@' + u : 'Guest';
  });

  isPremium = this.userService.isPremium;

  userRole = computed(() =>
    this.isPremium() ? 'Pro Member' : 'Community Member'
  );

  joinedDate = computed(() => this.userService.profile()?.date_joined);

  // --- ECHTE STATS ---
  // Wir greifen auf die Längen der Arrays zu, die das Backend liefert
  userStats = computed(() => {
    const profile = this.userService.profile();

    return [
      {
        label: 'Saved',
        value: profile?.saved_components?.length || 0,
        icon: '💾'
      },
      {
        label: 'Created',
        value: profile?.created_components?.length || 0,
        icon: '⚡'
      },
      {
        label: 'Likes',
        value: profile?.total_likes || 0,
        icon: '❤️'
      }
    ];
  });

  // --- ACTIONS ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userService.updatePhoto(file).subscribe({
        next: () => { },
        error: (err) => console.error('Fehler beim Upload:', err)
      });
    }
  }

  openUpgrade() {
    if (!this.userService.profile()?.is_premium) {
      this.showUpgradeDialog.set(true);
    }
  }
}

