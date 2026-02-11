import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentAuthor, ComponentMeta } from '../../../../../interface/component-meta';
import { ProBadge } from "../../../user-ui/pro-badge/pro-badge";

@Component({
  selector: 'app-ui-playground-header',
  imports: [RouterLink, ProBadge],
  templateUrl: './ui-playground-header.html',
  styleUrl: './ui-playground-header.scss',
})
export class UiPlaygroundHeader {
  meta = input<ComponentMeta | undefined>(undefined);
  author = input<ComponentAuthor | undefined>(undefined);

  // Status Werte
  isPremium = input.required<boolean>();
  isLiked = input.required<boolean>();
  isSaved = input.required<boolean>();
  likeCount = input.required<number>();

  likeClicked = output<void>();
  saveClicked = output<void>();
}
