import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Typografie } from "../../../shared/text/typografie/typografie";

@Component({
  selector: 'app-profile-delete',
  imports: [Typografie],
  templateUrl: './profile-delete.html',
  styleUrl: './profile-delete.scss',
})
export class ProfileDelete {
  @Output() open = new EventEmitter<void>();
}
