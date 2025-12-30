import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Typografie } from "../../shared/text/typografie/typografie";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contribution',
  imports: [Typografie, RouterLink],
  templateUrl: './contribution.html',
  styleUrl: './contribution.scss',
})
export class Contribution {

}
