import { Component, inject } from '@angular/core';
import { Typografie } from "../../shared/text/typografie/typografie";
import { RouterLink } from '@angular/router';
import { Library } from '../../../service/components/library/library';

@Component({
  selector: 'app-components-home',
  imports: [Typografie, RouterLink],
  templateUrl: './components-home.html',
  styleUrl: './components-home.scss',
})
export class ComponentsHome {
  private library = inject(Library);

  categories = this.library.getOnlyComponents();
}
