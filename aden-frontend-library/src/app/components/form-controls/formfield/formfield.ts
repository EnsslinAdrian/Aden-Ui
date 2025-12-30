import { Component } from '@angular/core';
import { NeonValidationForm } from "./components/neon-validation-form/neon-validation-form";

@Component({
  selector: 'app-formfield',
  imports: [NeonValidationForm],
  templateUrl: './formfield.html',
  styleUrl: './formfield.scss',
})
export class Formfield {

}
