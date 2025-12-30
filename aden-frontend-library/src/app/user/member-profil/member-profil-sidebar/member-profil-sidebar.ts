import { Component, input } from '@angular/core';

@Component({
  selector: 'app-member-profil-sidebar',
  imports: [],
  templateUrl: './member-profil-sidebar.html',
  styleUrl: './member-profil-sidebar.scss',
})
export class MemberProfilSidebar {
   user = input.required<any>();
}
