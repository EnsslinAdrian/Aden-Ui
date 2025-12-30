import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-joined',
  imports: [DatePipe],
  templateUrl: './joined.html',
  styleUrl: './joined.scss',
})
export class Joined {
  joinedDate = input<string | Date | undefined>(undefined);
}
