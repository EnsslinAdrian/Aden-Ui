import { Component } from '@angular/core';
import { SmartAutocomplete } from "./components/smart-autocomplete/smart-autocomplete";

@Component({
  selector: 'app-autocomplete',
  imports: [SmartAutocomplete],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
})
export class Autocomplete {

}
