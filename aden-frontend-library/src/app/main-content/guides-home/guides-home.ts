import { Component, inject } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";
import { RouterLink } from '@angular/router';
import { Auth } from '../../../service/auth/auth';
import { Library } from '../../../service/components/library/library';

@Component({
  selector: 'app-guides-home',
  imports: [Typografie, RouterLink],
  templateUrl: './guides-home.html',
  styleUrl: './guides-home.scss',
})
export class GuidesHome {
  private library = inject(Library);
  public auth = inject(Auth);

  categories = this.library.getOnlyGuides();
}
