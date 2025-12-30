import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { FormsModule } from '@angular/forms';
import { InterfacesInteractiveDemo } from "./interfaces-interactive-demo/interfaces-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-interfaces',
  imports: [Notice, HeadlineGuides, FormsModule, InterfacesInteractiveDemo, CodeBlockGuide],
  templateUrl: './interfaces.html',
  styleUrl: './interfaces.scss',
})
export class Interfaces {

  // 1. Definition
  interfaceDefinitionCode = `// 1. Define sub-types first
export interface Address {
  city: string;
  zip: number;
}

// 2. Compose them into the main model
export interface User {
  id: number;
  username: string;
  email: string;

  // Optional field (marked with ?)
  // Use this for data that might be null/undefined
  avatarUrl?: string;

  // Nested Interface
  address: Address;

  // Union Type: strict value enforcement
  // Much safer than just 'string'!
  role: 'admin' | 'editor' | 'viewer';
}`;

  // 2. Usage
  interfaceUsageCode = `// ✅ Valid object
const admin: User = {
  id: 1,
  username: 'Aden',
  email: 'aden@library.com',
  address: { city: 'Berlin', zip: 10115 },
  role: 'admin' // IntelliSense suggests values here!
};

// ❌ Error: Missing 'email' & Wrong Role
const guest: User = {
  id: 2,
  username: 'Guest',
  address: { city: 'Munich', zip: 80331 },

  // Error: Type '"superuser"' is not assignable to type...
  role: 'superuser'
};`;

}
