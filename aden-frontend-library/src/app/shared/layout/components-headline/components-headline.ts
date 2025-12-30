import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-components-headline',
  imports: [],
  templateUrl: './components-headline.html',
  styleUrl: './components-headline.scss',
})
export class ComponentsHeadline {
  @Input() number: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

}
