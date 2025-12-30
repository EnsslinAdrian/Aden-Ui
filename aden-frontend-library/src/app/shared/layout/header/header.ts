import { Component } from '@angular/core';
import { HeaderSettings } from "./header-settings/header-settings";
import { HeaderBreadcumbs } from "./header-breadcumbs/header-breadcumbs";
import { HeaderLogo } from "./header-logo/header-logo";

@Component({
  selector: 'app-header',
  imports: [HeaderSettings, HeaderBreadcumbs, HeaderLogo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
