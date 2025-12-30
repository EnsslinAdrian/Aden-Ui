import { Component, inject } from '@angular/core';
import { Layout } from '../../../../../service/global/layout/layout';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-logo',
  imports: [RouterLink],
  templateUrl: './header-logo.html',
  styleUrl: './header-logo.scss',
})
export class HeaderLogo {
 public layoutService = inject(Layout);
}
