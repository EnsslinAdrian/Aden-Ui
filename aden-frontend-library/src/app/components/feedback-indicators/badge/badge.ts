import { Component } from '@angular/core';
import { StatusBadges } from "./components/status-badges/status-badges";


@Component({
  selector: 'app-badge',
  imports: [StatusBadges],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {

}
