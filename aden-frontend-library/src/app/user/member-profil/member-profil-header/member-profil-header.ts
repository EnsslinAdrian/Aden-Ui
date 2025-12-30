import { Component, input } from '@angular/core';
import { FreeMeta } from "../../../shared/user-ui/free-meta/free-meta";
import { ProMeta } from "../../../shared/user-ui/pro-meta/pro-meta";
import { Joined } from "../../../shared/user-ui/joined/joined";
import { ProBadge } from "../../../shared/user-ui/pro-badge/pro-badge";

@Component({
  selector: 'app-member-profil-header',
  imports: [FreeMeta, ProMeta, Joined, ProBadge],
  templateUrl: './member-profil-header.html',
  styleUrl: './member-profil-header.scss',
})
export class MemberProfilHeader {
  user = input.required<any>();
  createdCount = input.required<number>();
}


