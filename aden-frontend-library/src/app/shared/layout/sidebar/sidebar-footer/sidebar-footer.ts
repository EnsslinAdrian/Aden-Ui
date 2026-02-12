import { Component } from '@angular/core';
import { Typografie } from "../../../text/typografie/typografie";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sidebar-footer',
  imports: [Typografie],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  version = environment.version;
}
