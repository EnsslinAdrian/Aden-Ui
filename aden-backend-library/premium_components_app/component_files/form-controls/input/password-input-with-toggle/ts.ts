import { Component } from '@angular/core';

@Component({
  selector: 'example-component',
  imports: [],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',

export class ExampleComponent {
  hidePassword = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}